import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../store";
import { deleteQuestion } from "./store";
import { useState } from "react";
import QuestionDialog from "../questions/QuestionDialog";
import OptionsMenu from "../../utils/OptionsMenu";

type NodeData = {
  id: string;
  text: string;
  x: number;
  y: number;
};

export default function NodeContent(props: NodeData) {
  const dispatch = useAppDispatch();
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  return (
    <Card sx={{ minWidth: 200, border: 1 }}>
      <CardHeader
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
        <Typography>{props.text}</Typography>
      </CardContent>
    </Card>
  );
}
