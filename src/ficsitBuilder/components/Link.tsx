import { LinkType, useBuilderStore } from "../store/builderStore";

export const Link = ({ data }: { data: LinkType }) => {
  const positions = useBuilderStore((s) => s.nodePositions);

  return (
    <>
      <path
        d={`M ${positions[data.source][0]} ${positions[data.source][1]} C ${
          positions[data.source][0]
        } ${positions[data.source][1]}, ${positions[data.target][0]} ${
          positions[data.target][1]
        }, ${positions[data.target][0]} ${positions[data.target][1]}`}
        stroke="#000"
        strokeWidth={3}
        fill="transparent"
      />
      <circle
        cx={positions[data.target][0]}
        cy={positions[data.target][1]}
        r="6"
      />
    </>
  );
};
