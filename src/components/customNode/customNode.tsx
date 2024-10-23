import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import "./customNode.style.css";
type CustomNodeProps = Node<
  {
    id: number;
    title: string;
    episodeId?: number;
    model?: string;
  },
  "string"
>;
function CustomNode({ data }: NodeProps<CustomNodeProps>) {
  const { episodeId, title, model } = data;
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="node-container">
        {episodeId && <h2>{`Episode ${episodeId}`}</h2>}
        <h2>{title}</h2>
        {model && <p>{model}</p>}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default CustomNode;
