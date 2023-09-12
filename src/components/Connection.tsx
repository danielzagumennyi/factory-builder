import { IConnectItem, useStore } from "../store";

export const Connection = ({ el }: { el: IConnectItem }) => {
  const pointPositions = useStore((s) => s.pointPositions);

  return (
    <path
      key={el.output + "_" + el.input}
      d={`M ${pointPositions[el.output][0]} ${pointPositions[el.output][1]} C ${
        pointPositions[el.output][0] + 100
      } ${pointPositions[el.output][1]}, ${pointPositions[el.input][0] - 100} ${
        pointPositions[el.input][1]
      }, ${pointPositions[el.input][0]} ${pointPositions[el.input][1]}`}
      stroke="#006eff"
      fill="transparent"
    />
  );
};
