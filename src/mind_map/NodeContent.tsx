import { Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

type NodeData = {
  id: string;
  // text: string;
};

export default function NodeContent(props: NodeData) {
  return (
    <Grid container direction={"column"}>
      <Grid
        container
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"flex-start"}
        spacing={1}
      >
        <Grid>
          <IconButton sx={{ width: "15px", height: "15px" }}>
            <AddIcon sx={{ width: "15px", height: "15px" }} />
          </IconButton>
        </Grid>
        <Grid>
          <IconButton sx={{ width: "15px", height: "15px" }}>
            <EditIcon sx={{ width: "15px", height: "15px" }} />
          </IconButton>
        </Grid>
        <Grid>
          <IconButton sx={{ width: "15px", height: "15px" }}>
            <DeleteIcon sx={{ width: "15px", height: "15px" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid>
        <Typography>{props.id}</Typography>
      </Grid>
    </Grid>
  );
}
