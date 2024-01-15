import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../store";
import { deleteProject, setCurrentProjectId } from "./projectsSlice";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { Project } from "./projectsTypes";

export default function ProjectListItem(props: { project: Project }) {
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="subtitle1">{props.project.name}</Typography>
        }
        action={
          <IconButton onClick={() => dispatch(deleteProject(props.project.id))}>
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="subtitle2">
          {props.project?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/hypothesis">
          <Button
            variant="outlined"
            onClick={() => dispatch(setCurrentProjectId(props.project.id))}
          >
            Przejdź do badania
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
