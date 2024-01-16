import { Route, Routes } from "react-router-dom";
import { Hypothesis } from "../mind_map/Hypothesis";
import { Grid } from "@mui/material";
import MindMapBar from "./MindMapBar";
import ControlPanel from "./ControlPanel";
import { ProjectsList } from "../projects/ProjectsList";
import SimpleTabProject from "../projects/ProjectBar";
import { InterviewTable } from "../interviews/InterviewTable";
import InterviewBar from "../interviews/InterviewBar";
import { useAppSelector } from "../store";
import CurrentInterviewBar from "../interviews/CurrentInterviewBar";
import Interview from "../interviews/Interview";
import { CodeGroupTable } from "../code_groups/CodeGroupTable";
import CodeGroupBar from "../code_groups/CodeGroupBar";

export default function MainRouteMap() {
  const { currentInterviewId } = useAppSelector(
    (state) => state.interviewReducer
  );

  return (
    <Grid container>
      <Grid item minWidth={20}>
        <ControlPanel />
      </Grid>
      <Grid item xs={12} marginLeft={"240px"}>
        <Grid container>
          <Routes>
            <Route path={`/`} element={<SimpleTabProject />} />
            <Route
              path={`/interview`}
              element={
                currentInterviewId ? <CurrentInterviewBar /> : <InterviewBar />
              }
            />
            <Route path={`/code-groups`} element={<CodeGroupBar />} />
            <Route path={`/mind-map`} element={<MindMapBar />} />
          </Routes>
        </Grid>
        <Grid container>
          <Routes>
            <Route path={`/`} element={<ProjectsList />} />
            <Route
              path={`/interview`}
              element={currentInterviewId ? <Interview /> : <InterviewTable />}
            />
            <Route path={`/code-groups`} element={<CodeGroupTable />} />
            <Route path={`/mind-map`} element={<Hypothesis />} />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
}
