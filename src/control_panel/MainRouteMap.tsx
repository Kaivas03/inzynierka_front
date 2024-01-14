import { Route, Routes } from "react-router-dom";
import { Hypothesis } from "../mind_map/Hypothesis";
import { Grid } from "@mui/material";
import SimpleTab from "./SimpleTab";
import ControlPanel from "./ControlPanel";
import { ProjectsList } from "../projects/ProjectsList";

export default function MainRouteMap() {
  return (
    <Grid container>
      <Grid item minWidth={20}>
        <ControlPanel />
      </Grid>
      <Grid item xs={12} marginLeft={20}>
        <Grid container>
          <SimpleTab />
        </Grid>
        <Grid container>
          <Routes>
            <Route path={`/`} element={<ProjectsList />} />
            <Route path={`/hypothesis`} element={<Hypothesis />} />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
}
