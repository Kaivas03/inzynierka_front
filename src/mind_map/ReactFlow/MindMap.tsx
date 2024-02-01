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
import { useParams } from "react-router-dom";

const nodeTypes = {
  mindmap: MindMapNode,
};

export function MindMap() {
  const { nodes, edges } = useAppSelector((store) => store.mindMapReducer);
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
    console.log(hypothesisId);
    // eslint-disable-next-line
  }, [dispatch, hypothesisId]);

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
