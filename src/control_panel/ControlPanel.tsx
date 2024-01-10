import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";

export default function ControlPanel() {
  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Link to="/intervievs">
          <Button>Wywiady</Button>
        </Link>
      </Grid>
      <Grid item>
        <Link to="/codes">
          <Button>Kody</Button>
        </Link>
      </Grid>
      <Grid item>
        <Link to="/code-groups">
          <Button>Grupy kodów</Button>
        </Link>
      </Grid>
      <Grid item>
        <Link to="/hypothesis">
          <Button>Hipotezy</Button>
        </Link>
      </Grid>
    </Grid>
  );
}
