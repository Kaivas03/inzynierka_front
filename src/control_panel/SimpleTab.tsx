import { AppBar, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";

export default function SimpleTab() {
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
          <Button variant="contained" startIcon={<AddIcon />} size="small">
            Dodaj Hipotezę
          </Button>
        </Grid>
        <Grid item margin={1}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            size="small"
            disabled
          >
            Zapisz pozycję
          </Button>
        </Grid>
        <Grid item margin={1}>
          <Button variant="contained" size="small">
            wybierz
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
}
