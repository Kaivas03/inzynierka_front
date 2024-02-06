import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { editProject } from "./projectsSlice";
import { useAppDispatch } from "../store";
import { useState } from "react";
import { Project } from "./projectsTypes";

type Props = {
  project: Project;
  open: boolean;
  onClose: () => void;
};

export default function ProjectEditDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState<string | null>(
    props.project.name
  );
  const [projectDescrition, setProjectDescrition] = useState<string | null>(
    props.project.description
  );
  const saveProject = () => {
    dispatch(editProject(props.project.id, projectName, projectDescrition));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Edytuj badanie</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa badania..."
            variant="standard"
            defaultValue={props.project.name}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Grid>
        <Grid marginTop={2}>
          <TextField
            label="Opis badania..."
            variant="standard"
            defaultValue={props.project.description}
            onChange={(e) => setProjectDescrition(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={saveProject}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
}
