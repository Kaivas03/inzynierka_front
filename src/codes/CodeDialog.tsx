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
import { createCode } from "./codeSlice";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CodeDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [codeName, setCodeName] = useState<string | null>("");
  const newProject = () => {
    dispatch(createCode(codeName));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Dodaj nowy wywiad</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa wywiadu..."
            variant="standard"
            onChange={(e) => setCodeName(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={newProject}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
