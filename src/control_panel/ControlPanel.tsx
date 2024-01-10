import { Link } from "react-router-dom";
import { Button, Drawer, Grid } from "@mui/material";

export const drawerWidth = 240;

export default function ControlPanel() {
  return (
    <Drawer variant="permanent" anchor="left">
      <Grid container direction={"column"}>
        <Grid item>
          <Link to="/">
            <Button>Projekty</Button>
          </Link>
        </Grid>
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
    </Drawer>
  );
}
