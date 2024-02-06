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

type Props = {
  code: Code;
  open: boolean;
  onClose: () => void;
};

export default function CodeEditDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [codeName, setCodeName] = useState<string | null>(props.code.name);
  const onEditCode = () => {
    dispatch(editCode(props.code.id, codeName));
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
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={onEditCode}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}
