import { Grid } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";
import NodeContent from "./NodeContent";

const initialNodes = [
  {
    id: "1",
    position: { x: 400, y: 0 },
    data: { label: <NodeContent id="1" /> },
  },
  {
    id: "2",
    position: { x: 400, y: 100 },
    data: { label: <NodeContent id="2" /> },
  },
  {
    id: "3",
    position: { x: 400, y: 200 },
    data: { label: <NodeContent id="3" /> },
  },
  {
    id: "4",
    position: { x: 400, y: 300 },
    data: { label: <NodeContent id="4" /> },
  },
  {
    id: "5",
    position: { x: 400, y: 400 },
    data: { label: <NodeContent id="5" /> },
  },
];
const initialEdges = [
  { id: "1", source: "1", target: "2" },
  { id: "2", source: "1", target: "3" },
  { id: "3", source: "1", target: "4" },
  { id: "4", source: "1", target: "5" },
];

let idNode = 5;
const getIdNode = () => `${idNode++}`;

let idEdge = 5;
const getIdEdge = () => `${idEdge++}`;

export function Hypothesis() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => console.log(edges), [edges]);

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
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </Grid>
  );
}
