import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch } from "../../store";
import { deleteQuestion } from "./store";
import { useState } from "react";
import QuestionDialog from "../questions/QuestionDialog";

type NodeData = {
  id: string;
  text: string;
  x: number;
  y: number;
};

export default function NodeContent(props: NodeData) {
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState(false);

  const handleClickOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Card sx={{ minWidth: 200, border: 1 }}>
      <CardHeader
        action={
          <Grid container direction={"row"}>
            <Grid>
              <IconButton onClick={handleClickOpen}>
                <AddIcon />
              </IconButton>
              <QuestionDialog
                id={props.id}
                posX={props.x}
                posY={props.y}
                open={opened}
                onClose={handleClose}
              />
            </Grid>
            <Grid>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton
                onClick={() => dispatch(deleteQuestion(parseInt(props.id)))}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        }
      />
      <CardContent>
        <Typography>{props.text}</Typography>
      </CardContent>
    </Card>
  );
}
