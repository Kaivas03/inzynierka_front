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
  const [hypothesisText, setHypothesisText] = useState<string | null>("");
  const newHypothesis = () => {
    dispatch(createHypothesis(hypothesisText));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Dodaj nową hipotezę</DialogTitle>
      <DialogContent>
        <TextField
          label="Treść hipotezy..."
          variant="standard"
          onChange={(e) => setHypothesisText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={newHypothesis}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
