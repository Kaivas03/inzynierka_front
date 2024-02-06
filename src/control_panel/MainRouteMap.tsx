import { Navigate, Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";
import MindMapBar from "../mind_map/MindMapBar";
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
import CodeBar from "../codes/CodesBar";
import { CodeTable } from "../codes/CodesTable";
import { useParams } from "react-router-dom";
import { MindMap } from "../mind_map/ReactFlow/MindMap";

export default function MainRouteMap() {
  const { currentInterviewId } = useAppSelector(
    (state) => state.interviewReducer
  );
  const { projectId } = useParams<{ projectId: string | undefined }>();

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
              path={`/:projectId/interview`}
              element={
                currentInterviewId ? <CurrentInterviewBar /> : <InterviewBar />
              }
            />
            <Route path={`/:projectId/codes`} element={<CodeBar />} />
            <Route
              path={`/:projectId/code-groups`}
              element={<CodeGroupBar />}
            />
            <Route path={`/:projectId/mind-map`} element={<MindMapBar />} />
            <Route
              path={`/:projectId/mind-map/:hypothesisId`}
              element={<MindMapBar />}
            />
            <Route
              path={`/:projectId`}
              element={<Navigate replace to={`/${projectId}/interview`} />}
            />
          </Routes>
        </Grid>
        <Grid container>
          <Routes>
            <Route path={`/`} element={<ProjectsList />} />
            <Route
              path={`/:projectId/interview`}
              element={currentInterviewId ? <Interview /> : <InterviewTable />}
            />
            <Route path={`/:projectId/codes`} element={<CodeTable />} />
            <Route
              path={`/:projectId/code-groups`}
              element={<CodeGroupTable />}
            />
            <Route path={`/:projectId/mind-map`} element={<MindMap />} />
            <Route
              path={`/:projectId`}
              element={<Navigate replace to={`/${projectId}/interview`} />}
            />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
}
