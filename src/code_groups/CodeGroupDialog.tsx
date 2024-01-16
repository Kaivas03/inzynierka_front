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
import { createCodeGroup } from "./codeGroupSlice";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CodeGroupDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [interviewName, setInterviewName] = useState<string | null>("");
  const newProject = () => {
    dispatch(createCodeGroup(interviewName));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Dodaj nową grupę</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa grupy..."
            variant="standard"
            onChange={(e) => setInterviewName(e.target.value)}
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
