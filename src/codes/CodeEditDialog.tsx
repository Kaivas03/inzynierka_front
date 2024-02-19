import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../store";
import { useState } from "react";
import { editCode } from "./codeSlice";
import { Code } from "./codeTypes";
import CodeGroupSingleSelect from "../utils/CodeGroupSingleSelect";

type Props = {
  code: Code;
  open: boolean;
  onClose: () => void;
};

export default function CodeEditDialog(props: Props) {
  const { code } = props;
  const dispatch = useAppDispatch();
  const [codeName, setCodeName] = useState<string | null>(props.code.name);
  const [codeGroupId, setCodeGroupId] = useState<number | undefined>(
    code.codeGroupId
  );
  const onEditCode = () => {
    dispatch(editCode(props.code.id, codeName, codeGroupId));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Edytuj kod</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa kodu..."
            variant="standard"
            defaultValue={props.code.name}
            onChange={(e) => setCodeName(e.target.value)}
          />
        </Grid>
        <CodeGroupSingleSelect
          defaultCodeGroupId={code.codeGroupId}
          setSelectedCodeGroupId={(e: number | undefined) => setCodeGroupId(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={onEditCode}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}
