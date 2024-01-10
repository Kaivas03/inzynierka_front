import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";

export default function SimpleTab() {
  return (
    <Grid item>
      <Link to="/">
        <Button>Powrót</Button>
      </Link>
      <Button>Różne</Button>
      <Button>żne</Button>
      <Button>Przy</Button>
      <Button>cis</Button>
      <Button>ki</Button>
    </Grid>
  );
}
