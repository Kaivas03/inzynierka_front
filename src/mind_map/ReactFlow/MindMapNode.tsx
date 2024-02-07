import { useEffect, useRef } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import NodeContent from "./NodeContent";
import { useAppSelector } from "../../store";

export type NodeData = {
  text: string;
};

function MindMapNode({ id, data, xPos, yPos }: NodeProps<NodeData>) {
  const { questionsList } = useAppSelector((state) => state.hypothesisReducer);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 1);
  }, []);

  return (
    <>
      <NodeContent
        id={id}
        text={data.text}
        x={xPos}
        y={yPos}
        question={questionsList.find((question) => question.id === Number(id))}
      />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default MindMapNode;
