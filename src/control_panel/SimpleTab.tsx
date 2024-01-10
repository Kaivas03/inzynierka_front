import { AppBar, Button, Grid } from "@mui/material";

export default function SimpleTab() {
  return (
    <AppBar position="sticky">
      <Grid item>
        <Button variant="contained">Ró</Button>
        <Button variant="contained">żne</Button>
        <Button variant="contained">Przy</Button>
        <Button variant="contained">cis</Button>
        <Button variant="contained">ki</Button>
      </Grid>
    </AppBar>
  );
}
