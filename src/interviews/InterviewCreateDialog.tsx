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
import { createInterview } from "./interviewsSlice";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InterviewCreateDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [interviewName, setInterviewName] = useState<string | null>("");
  const [interviewText, setInterviewText] = useState<string | null>("");
  const newProject = () => {
    dispatch(createInterview(interviewName, interviewText));
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
            onChange={(e) => setInterviewName(e.target.value)}
          />
        </Grid>
        <Grid marginTop={2} width={500}>
          <TextField
            fullWidth
            label="Tekst wywiadu..."
            multiline
            onChange={(e) => setInterviewText(e.target.value)}
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
