import { Route, Routes } from "react-router-dom";
import { Hypothesis } from "../mind_map/Hypothesis";
import { Grid } from "@mui/material";
import MindMapBar from "./MindMapBar";
import ControlPanel from "./ControlPanel";
import { ProjectsList } from "../projects/ProjectsList";
import SimpleTabProject from "../projects/ProjectBar";

export default function MainRouteMap() {
  return (
    <Grid container>
      <Grid item minWidth={20}>
        <ControlPanel />
      </Grid>
      <Grid item xs={12} marginLeft={"240px"}>
        <Grid container>
          <Routes>
            <Route path={`/`} element={<SimpleTabProject />} />
            <Route path={`/mind-map`} element={<MindMapBar />} />
          </Routes>
        </Grid>
        <Grid container>
          <Routes>
            <Route path={`/`} element={<ProjectsList />} />
            <Route path={`/mind-map`} element={<Hypothesis />} />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
}
