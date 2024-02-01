import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store";
import { addChildNode, createQuestion } from "../ReactFlow/store";

type Props = {
  id: string;
  posX: number;
  posY: number;
  open: boolean;
  onClose: () => void;
};

export default function QuestionDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [questionText, setQuestionText] = useState<string | null>("");
  const newQuestion = () => {
    dispatch(
      addChildNode(props.id, questionText ? questionText : "", {
        x: props.posX,
        y: props.posY + 200,
      })
    );
    dispatch(
      createQuestion(
        parseInt(props.id),
        questionText ? questionText : "",
        props.posX,
        props.posY + 200
      )
    );
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Dodaj nowe pytanie</DialogTitle>
      <DialogContent>
        <TextField
          label="Treść pytania..."
          variant="standard"
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={newQuestion}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
