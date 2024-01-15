import React, { useEffect } from "react";
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchHypothesisList } from "./hypothesisSlice";
import { Position, SokNode } from "./hypothesisTypes";
import { MindMap } from "./ReactFlow/MindMap";
import { ReactFlowProvider } from "reactflow";
import { fetchMindMap } from "./ReactFlow/store";

export interface CoolNode {
  id: string;
  position: Position;
  data: { label: JSX.Element };
}

export function Hypothesis() {
  const dispatch = useAppDispatch();
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);
  const { currentHypothesisId, nodePackage } = useAppSelector(
    (state) => state.hypothesisReducer
  );

  useEffect(() => {
    currentProjectId && dispatch(fetchHypothesisList());
  }, [dispatch, currentProjectId]);

  useEffect(() => {
    currentHypothesisId && dispatch(fetchMindMap());
    // eslint-disable-next-line
  }, [dispatch, currentHypothesisId]);

  return (
    <ReactFlowProvider>
      <MindMap />
    </ReactFlowProvider>
  );
}
