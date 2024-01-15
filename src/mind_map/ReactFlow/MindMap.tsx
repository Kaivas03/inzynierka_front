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
} from "reactflow";

import { setEdges, setNodes } from "./store";
import MindMapNode from "./MindMapNode";
import { useAppDispatch, useAppSelector } from "../../store";
import { useEffect } from "react";
import { setNodeMoved } from "../hypothesisSlice";

const nodeTypes = {
  mindmap: MindMapNode,
};

export function MindMap() {
  const { nodes, edges } = useAppSelector((store) => store.mindMapReducer);
  const dispatch = useAppDispatch();

  const onNodesChange: OnNodesChange = (changes: NodeChange[]) => {
    dispatch(setNodes(applyNodeChanges(changes, nodes)));
  };

  const onEdgesChange: OnEdgesChange = (changes: EdgeChange[]) => {
    dispatch(setEdges(applyEdgeChanges(changes, edges)));
  };

  useEffect(() => {
    dispatch(setNodeMoved(true));
  }, [nodes]);

  return (
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
  );
}
