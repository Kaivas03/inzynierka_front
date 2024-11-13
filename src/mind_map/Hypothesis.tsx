import { useEffect } from "react";
import "reactflow/dist/style.css";
import { useAppDispatch } from "../store";
import { fetchHypothesisList } from "./hypothesisSlice";
import { MindMap } from "./ReactFlow/MindMap";
import { ReactFlowProvider } from "reactflow";
import { fetchMindMap, makeNodePackageEmpty } from "./ReactFlow/mindMapSlice";
import { useParams } from "react-router-dom";

export function Hypothesis() {
  const dispatch = useAppDispatch();
  const { hypothesisId } = useParams<{ hypothesisId: string | undefined }>();
  const { projectId } = useParams<{ projectId: string | undefined }>();

  useEffect(() => {
    projectId && dispatch(fetchHypothesisList());
  }, [dispatch, projectId]);

  useEffect(() => {
    hypothesisId && dispatch(fetchMindMap());
    if (hypothesisId === undefined) {
      dispatch(makeNodePackageEmpty());
    }
    // eslint-disable-next-line
  }, [dispatch, hypothesisId]);

  return (
    <ReactFlowProvider>
      <MindMap />
    </ReactFlowProvider>
  );
}
