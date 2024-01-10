import { Route, Routes } from "react-router-dom";
import { Hypothesis } from "../hypothesis/Hypothesis";
import { Grid } from "@mui/material";
import SimpleTab from "./SimpleTab";
import ControlPanel from "./ControlPanel";

export default function MainRouteMap() {
  return (
    <Grid container>
      <Grid container xs={2}>
        <ControlPanel />
      </Grid>
      <Grid container xs={10}>
        <Grid container>
          <SimpleTab />
        </Grid>
        <Grid container>
          <Routes>
            <Route path={`/hypothesis`} element={<Hypothesis />} />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
}
