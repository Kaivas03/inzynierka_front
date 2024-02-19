import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect, useState } from "react";
import { editCodeGroup } from "./codeGroupSlice";
import { CodeGroup } from "./codeGroupTypes";
import CodeMultiSelect from "../utils/CodeMultiSelect";
import { Code } from "../codes/codeTypes";
import { fetchCodeList } from "../codes/codeSlice";

type Props = {
  codeGroup: CodeGroup;
  open: boolean;
  onClose: () => void;
};

export default function CodeGroupEditDialog(props: Props) {
  const { codeGroup, open, onClose } = props;
  const dispatch = useAppDispatch();
  const { codesList } = useAppSelector((state) => state.codesReducer);
  const [groupCodeIds, setGroupCodeIds] = useState<number[]>(
    codeGroup.codes.map(({ id }) => id)
  );
  const [codeGroupName, setCodeGroupName] = useState<string | null>(
    codeGroup.name
  );
  const onEditCodeGroup = () => {
    dispatch(editCodeGroup(codeGroup.id, codeGroupName, groupCodeIds));
    onClose();
  };

  useEffect(() => {
    dispatch(fetchCodeList());
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog open={open}>
      <DialogTitle>Edytuj grupę kodów</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa grupy..."
            variant="standard"
            defaultValue={codeGroup.name}
            onChange={(e) => setCodeGroupName(e.target.value)}
          />
        </Grid>
        {false && (
          <Grid>
            <CodeMultiSelect
              setSelectedCodes={(e: Code[]) =>
                setGroupCodeIds(e.map(({ id }) => id))
              }
              textFieldVariant="outlined"
              codes={codesList}
              initialCodes={codeGroup.codes}
              helperText="Dodaj kody"
              error={false}
            />
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={onEditCodeGroup}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}
