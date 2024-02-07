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
import QuestionDialog from "../questions/QuestionDialog";
import OptionsMenu from "../../utils/OptionsMenu";
import { Question } from "../hypothesisTypes";

type NodeData = {
  id: string;
  text: string;
  x: number;
  y: number;
  question: Question | undefined;
};

export default function NodeContent(props: NodeData) {
  const dispatch = useAppDispatch();
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  return (
    <Card sx={{ minWidth: 200, border: 1 }}>
      <CardHeader
        title={<Typography>{props.text}</Typography>}
        action={
          <Grid container direction={"row"}>
            <Grid>
              <IconButton onClick={() => setCreateOpen(true)}>
                <AddIcon />
              </IconButton>
              <QuestionDialog
                id={props.id}
                posX={props.x}
                posY={props.y}
                open={createOpen}
                onClose={() => setCreateOpen(false)}
              />
            </Grid>
            <OptionsMenu
              openEditDialog={() => setCreateOpen(true)}
              onDelete={() => dispatch(deleteQuestion(parseInt(props.id)))}
            />
          </Grid>
        }
      />
      <CardContent>
        <Grid container direction={"column"}>
          <Grid item marginBottom={2}>
            <Typography>Kody:</Typography>
            {props.question?.codes.map((code, index) => (
              <Chip label={code.name} variant="outlined" onClick={() => {}} />
            ))}
          </Grid>
          <Grid item>
            <Typography>Grupy kodów:</Typography>
            {props.question?.codeGroups.map((codeGroup, index) => (
              <Chip
                label={codeGroup.name}
                variant="outlined"
                onClick={() => {}}
              />
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
