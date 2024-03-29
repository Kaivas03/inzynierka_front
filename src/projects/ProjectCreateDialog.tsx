import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { createProject } from "./projectsSlice";
import { useAppDispatch } from "../store";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProjectCreateDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState<string | null>("");
  const [projectDescrition, setProjectDescrition] = useState<string | null>("");
  const newProject = () => {
    dispatch(createProject(projectName, projectDescrition));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Dodaj nowe badanie</DialogTitle>
      <DialogContent>
        <Grid>
          <TextField
            label="Nazwa badania..."
            variant="standard"
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Grid>
        <Grid marginTop={2}>
          <TextField
            label="Opis badania..."
            variant="standard"
            onChange={(e) => setProjectDescrition(e.target.value)}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={newProject}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
