import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../store";
import { deleteQuestion } from "./mindMapSlice";
import { useState } from "react";
import QuestionCreateDialog from "../questions/QuestionCreateDialog";
import OptionsMenu from "../../utils/OptionsMenu";
import { Question } from "../hypothesisTypes";
import QuestionEditDialog from "../questions/QuestionEditDialog";

type NodeData = {
  id: string;
  text: string;
  x: number;
  y: number;
  question: Question;
};

export default function NodeContent(props: NodeData) {
  const { id, text, x, y, question } = props;
  const dispatch = useAppDispatch();
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  return (
    <Card sx={{ minWidth: 200, border: 1 }}>
      <CardHeader
        title={<Typography>{text}</Typography>}
        action={
          <Grid container direction={"row"}>
            <Grid>
              <IconButton onClick={() => setCreateOpen(true)}>
                <AddIcon />
              </IconButton>
              <QuestionCreateDialog
                id={id}
                posX={x}
                posY={y}
                open={createOpen}
                onClose={() => setCreateOpen(false)}
              />
            </Grid>
            <OptionsMenu
              openEditDialog={() => setEditOpen(true)}
              onDelete={() => dispatch(deleteQuestion(parseInt(id)))}
            />
          </Grid>
        }
      />
      <CardContent>
        <Grid container direction={"column"}>
          <Grid item marginBottom={2}>
            <Typography>Kody:</Typography>
            {question?.codes.map((code, index) => (
              <Chip label={code.name} variant="outlined" onClick={() => {}} />
            ))}
          </Grid>
          <Grid item>
            <Typography>Grupy kodów:</Typography>
            {question?.codeGroups.map((codeGroup, index) => (
              <Chip
                label={codeGroup.name}
                variant="outlined"
                onClick={() => {}}
              />
            ))}
          </Grid>
        </Grid>
        <QuestionEditDialog
          question={question}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      </CardContent>
    </Card>
  );
}
