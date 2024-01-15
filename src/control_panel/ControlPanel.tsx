import { Link } from "react-router-dom";
import { Button, Divider, Drawer, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentProjectId } from "../projects/projectsSlice";

export const drawerWidth = 240;

export default function ControlPanel() {
  const dispatch = useAppDispatch();
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);

  return (
    <Drawer variant="permanent" anchor="left" sx={{ minWidth: 20 }}>
      <Grid container direction={"column"}>
        <Grid item margin={1}>
          <Link to="/">
            <Button
              onClick={() => dispatch(setCurrentProjectId(undefined))}
              variant="outlined"
            >
              Badania
            </Button>
          </Link>
        </Grid>
        {currentProjectId && (
          <Grid container direction={"column"}>
            <Divider />
            <Grid item margin={1}>
              <Link to="/intervievs">
                <Button variant="outlined">Wywiady</Button>
              </Link>
            </Grid>
            <Divider />
            <Grid item margin={1}>
              <Link to="/codes">
                <Button variant="outlined">Kody</Button>
              </Link>
            </Grid>
            <Divider />
            <Grid item margin={1}>
              <Link to="/code-groups">
                <Button variant="outlined">Grupy kodów</Button>
              </Link>
            </Grid>
            <Divider />
            <Grid item margin={1}>
              <Link to="/mind-map">
                <Button variant="outlined">Hipotezy</Button>
              </Link>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Drawer>
  );
}
