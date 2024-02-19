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
import { createCodeGroup } from "./codeGroupSlice";
import CodeMultiSelect from "../utils/CodeMultiSelect";
import { Code } from "../codes/codeTypes";
import { fetchCodeList } from "../codes/codeSlice";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CodeGroupCreateDialog(props: Props) {
  const { open, onClose } = props;
  const dispatch = useAppDispatch();
  const { codesList } = useAppSelector((state) => state.codesReducer);
  const [interviewName, setInterviewName] = useState<string | null>("");
  const [groupCodeIds, setGroupCodeIds] = useState<number[]>([]);
  const newCodeGroup = () => {
    dispatch(createCodeGroup(interviewName, groupCodeIds));
    onClose();
  };

  useEffect(() => {
    dispatch(fetchCodeList());
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog open={open}>
      <DialogTitle>Dodaj nową grupę</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa grupy..."
            variant="standard"
            onChange={(e) => setInterviewName(e.target.value)}
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
              initialCodes={[]}
              helperText="Dodaj kody"
              error={false}
            />
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={newCodeGroup}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
