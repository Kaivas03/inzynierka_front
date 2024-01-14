import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../store";
import { setCurrentProjectId } from "./projectsSlice";
import { Link } from "react-router-dom";

interface ProjectProps {
  id: number;
  name: string;
}

export default function ProjectListItem(props: ProjectProps) {
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">{props.name}</Typography>
      </CardContent>
      <CardActions>
        <Link to="/intervievs">
          <Button
            variant="outlined"
            onClick={() => dispatch(setCurrentProjectId(props.id))}
          >
            Przejdź do projektu :D
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
