import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../store";
import { deleteProject, setCurrentProjectId } from "./projectsSlice";
import { Project } from "./projectsTypes";
import { useNavigateSok } from "../utils/hooks";
import OptionsMenu from "../utils/OptionsMenu";
import { useState } from "react";
import ProjectEditDialog from "./ProjectEditDialog";

export default function ProjectListItem(props: { project: Project }) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigateSok();

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="subtitle1">{props.project.name}</Typography>
        }
        action={
          <OptionsMenu
            openEditDialog={() => setEditOpen(true)}
            onDelete={() => dispatch(deleteProject(props.project.id))}
          />
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
      <ProjectEditDialog
        project={props.project}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </Card>
  );
}
