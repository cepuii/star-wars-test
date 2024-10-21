import { Handle, Position } from "@xyflow/react";

const handleStyle = { left: 10 };

interface DataProps {
  title: string;
  episodeId?: number;
  model?: string;
}

function CustomNode({ data }) {
  const { episodeId, title, model } = data as DataProps;
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          border: "1px solid #6f6f6f",
          borderRadius: "20px",
          fontSize: "0.8rem",
          padding: "10px",
          margin: "0 10px",
          textAlign: "center",
        }}
      >
        {episodeId && <h2>{`Episode ${episodeId}`}</h2>}
        <h2>{title}</h2>
        {model && <p>{model}</p>}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default CustomNode;
