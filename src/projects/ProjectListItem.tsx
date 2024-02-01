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
import DeleteIcon from "@mui/icons-material/Delete";
import { Project } from "./projectsTypes";
import { useNavigateSok } from "../utils/hooks";

export default function ProjectListItem(props: { project: Project }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigateSok();

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
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`/${props.project.id}/interview`);
            dispatch(setCurrentProjectId(props.project.id));
          }}
        >
          Przejdź do badania
        </Button>
      </CardActions>
    </Card>
  );
}
