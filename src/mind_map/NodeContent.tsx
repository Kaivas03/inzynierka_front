import { Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteQuestion } from "./ReactFlow/store";
import { useState } from "react";
import QuestionDialog from "./questions/QuestionDialog";

type NodeData = {
  id: string;
  text: string;
  x: number;
  y: number;
};

export default function NodeContent(props: NodeData) {
  const { currentHypothesisId } = useAppSelector(
    (store) => store.hypothesisReducer
  );
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState(false);

  const handleClickOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Grid sx={{ border: 1, borderRadius: "12px", backgroundColor: "white" }}>
      <Grid margin={1} container direction={"column"}>
        <Grid container direction={"row"} spacing={1}>
          <Grid>
            <IconButton
              sx={{ width: "15px", height: "15px" }}
              onClick={handleClickOpen}
            >
              <AddIcon sx={{ width: "15px", height: "15px" }} />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton sx={{ width: "15px", height: "15px" }}>
              <EditIcon sx={{ width: "15px", height: "15px" }} />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton
              sx={{ width: "15px", height: "15px" }}
              onClick={() => dispatch(deleteQuestion(parseInt(props.id)))}
            >
              <DeleteIcon sx={{ width: "15px", height: "15px" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid>
          <Typography>{props.text}</Typography>
        </Grid>
      </Grid>
      <QuestionDialog
        id={props.id}
        posX={props.x}
        posY={props.y}
        open={opened}
        onClose={handleClose}
      />
    </Grid>
  );
}
