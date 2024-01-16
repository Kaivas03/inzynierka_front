import React, { useEffect } from "react";
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchHypothesisList } from "./hypothesisSlice";
import { MindMap } from "./ReactFlow/MindMap";
import { ReactFlowProvider } from "reactflow";
import { fetchMindMap, makeNodePackageEmpty } from "./ReactFlow/store";

export function Hypothesis() {
  const dispatch = useAppDispatch();
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const { currentHypothesisId } = useAppSelector(
    (state) => state.hypothesisReducer
  );

  useEffect(() => {
    currentProjectId && dispatch(fetchHypothesisList());
  }, [dispatch, currentProjectId]);

  useEffect(() => {
    currentHypothesisId && dispatch(fetchMindMap());
    if (currentHypothesisId === undefined) {
      dispatch(makeNodePackageEmpty());
    }
    // eslint-disable-next-line
  }, [dispatch, currentHypothesisId]);

  return (
    <ReactFlowProvider>
      <MindMap />
    </ReactFlowProvider>
  );
}
