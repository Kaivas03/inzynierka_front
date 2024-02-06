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
import { editInterview } from "./interviewsSlice";
import { Interview } from "./interviewsTypes";

type Props = {
  interview: Interview;
  open: boolean;
  onClose: () => void;
};

export default function InterviewEditDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [interviewName, setInterviewName] = useState<string | null>(
    props.interview.name
  );
  const [interviewText, setInterviewText] = useState<string | null>(
    props.interview.text
  );
  const onEditInterview = () => {
    dispatch(editInterview(props.interview.id, interviewName, interviewText));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Edytuj wywiad</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa wywiadu..."
            variant="standard"
            defaultValue={props.interview.name}
            onChange={(e) => setInterviewName(e.target.value)}
          />
        </Grid>
        <Grid marginTop={2} width={500}>
          <TextField
            fullWidth
            label="Tekst wywiadu..."
            multiline
            defaultValue={props.interview.text}
            onChange={(e) => setInterviewText(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={onEditInterview}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}
