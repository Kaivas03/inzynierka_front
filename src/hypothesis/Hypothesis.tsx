import { Button, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  { id: "3", position: { x: 0, y: 200 }, data: { label: "3" } },
  { id: "4", position: { x: 0, y: 300 }, data: { label: "4" } },
  { id: "5", position: { x: 0, y: 400 }, data: { label: "5" } },
];
const initialEdges = [
  { id: "1", source: "1", target: "2" },
  { id: "2", source: "1", target: "3" },
  { id: "3", source: "1", target: "4" },
  { id: "4", source: "1", target: "5" },
];

export function Hypothesis() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => console.log(nodes), [nodes]);

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={2}>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Typography>WTF</Typography>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
        <Button>xd</Button>
      </Grid>
      <Grid item xs={10}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </Grid>
    </Grid>
  );
}
