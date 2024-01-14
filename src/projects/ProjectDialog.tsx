import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { createProject } from "./projectsSlice";
import { useAppDispatch } from "../store";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProjectDialog(props: Props) {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState<string | null>("");
  const [projectDescrition, setProjectDescrition] = useState<string | null>("");
  const newProject = () => {
    dispatch(createProject(projectName, projectDescrition, props.onClose));
    props.onClose();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Dodaj nowy projekt</DialogTitle>
      <DialogContent>
        <TextField
          label="Nazwa projektu..."
          variant="standard"
          onChange={(e) => setProjectName(e.target.value)}
        />
        <TextField
          label="Opis projektu..."
          variant="standard"
          onChange={(e) => setProjectDescrition(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Anuluj</Button>
        <Button onClick={newProject}>Utwórz</Button>
      </DialogActions>
    </Dialog>
  );
}
