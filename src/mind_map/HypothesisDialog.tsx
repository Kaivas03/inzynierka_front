import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../store";
import { useState } from "react";
import { createHypothesis } from "./hypothesisSlice";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function HypothesisDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [hypothesisName, setHypothesisName] = useState<string | null>("");
  const newProject = () => {
    dispatch(createHypothesis(hypothesisName, props.onClose));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Dodaj nowy projekt</DialogTitle>
      <DialogContent>
        <TextField
          label="Nazwa projektu..."
          variant="standard"
          onChange={(e) => setHypothesisName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={newProject}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
