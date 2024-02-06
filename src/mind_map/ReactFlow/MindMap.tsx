import { Grid } from "@mui/material";
import "reactflow/dist/style.css";
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  OnNodesChange,
  OnEdgesChange,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from "reactflow";
import {
  fetchMindMap,
  makeNodePackageEmpty,
  setEdges,
  setNodes,
} from "./store";
import MindMapNode from "./MindMapNode";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { fetchHypothesisList, setNodeMoved } from "../hypothesisSlice";

const nodeTypes = {
  mindmap: MindMapNode,
};

export function MindMap() {
  const { nodes, edges } = useAppSelector((store) => store.mindMapReducer);
  const dispatch = useAppDispatch();
  const { currentHypothesisId } = useAppSelector(
    (state) => state.hypothesisReducer
  );
  const { currentProjectId } = useAppSelector((state) => state.projectsReducer);

  useEffect(() => {
    currentProjectId && dispatch(fetchHypothesisList());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    currentHypothesisId && dispatch(fetchMindMap());
    if (currentHypothesisId === undefined) {
      dispatch(makeNodePackageEmpty());
    }
    // eslint-disable-next-line
  }, [dispatch, currentHypothesisId]);

  const onNodesChange: OnNodesChange = (changes: NodeChange[]) => {
    dispatch(setNodes(applyNodeChanges(changes, nodes)));
  };

  const onEdgesChange: OnEdgesChange = (changes: EdgeChange[]) => {
    dispatch(setEdges(applyEdgeChanges(changes, edges)));
  };

  useEffect(() => {
    dispatch(setNodeMoved(true));
    // eslint-disable-next-line
  }, [nodes]);

  return (
    <ReactFlowProvider>
      <Grid
        item
        xs={12}
        sx={{
          height: "90vh",
          border: 1,
        }}
        margin={1}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </Grid>
    </ReactFlowProvider>
  );
}
