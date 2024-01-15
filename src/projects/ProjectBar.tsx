import { AppBar, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ProjectDialog from "./ProjectDialog";

export default function SimpleTabProject() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky" color="default">
      <Grid container spacing={1}>
        <Grid item margin={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            onClick={handleClickOpen}
          >
            Dodaj Projekt
          </Button>
          <ProjectDialog open={open} onClose={handleClose} />
        </Grid>
      </Grid>
    </AppBar>
  );
}
