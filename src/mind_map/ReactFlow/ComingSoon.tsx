import { Grid } from "@mui/material";
import "reactflow/dist/style.css";
import ReactFlow, {
  Background,
  MiniMap,
  Panel,
  ReactFlowProvider,
} from "reactflow";
import { useEffect, useState } from "react";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "SOK" },
  },
  {
    id: "2",
    position: { x: 200, y: 0 },
    data: { label: "COMING SOON ;D" },
  },
];

const calculatePositionOnCircle = (radius: number, angle: number) => {
  // Konwersja kąta na radiany
  const angleInRadians = (angle * Math.PI) / 180;

  // Obliczenia pozycji na okręgu
  const x = radius * Math.cos(angleInRadians);
  const y = radius * Math.sin(angleInRadians);

  return { x, y };
};

export function ComingSoon() {
  const [nodes, setNodes] = useState(initialNodes);
  const [angle, setAngle] = useState(46);

  useEffect(() => {
    let position = calculatePositionOnCircle(200, angle);
    setNodes([
      {
        id: "1",
        position: { x: 0, y: 0 },
        data: { label: "SOK" },
      },
      {
        id: "2",
        position: { x: position.x, y: position.y },
        data: { label: "COMING SOON ;D" },
      },
    ]);
    if (angle >= 360) {
      setAngle(0);
    } else {
      setAngle(angle + 0.01);
    }
    // eslint-disable-next-line
  });

  return (
    <ReactFlowProvider>
      <Grid
        item
        xs={12}
        sx={{
          height: "100vh",
        }}
      >
        <ReactFlow nodes={nodes} fitView>
          <Panel position="top-left">By McBambosz</Panel>
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </Grid>
    </ReactFlowProvider>
  );
}
