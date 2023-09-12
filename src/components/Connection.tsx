import { IConnectItem, useStore } from "../store";

export const Connection = ({ el }: { el: IConnectItem }) => {
  const pointPositions = useStore((s) => s.pointPositions);

  return (
    <path
      key={el.id + "_" + el.target}
      d={`M ${pointPositions[el.id][0]} ${pointPositions[el.id][1]} C ${
        pointPositions[el.id][0] + 100
      } ${pointPositions[el.id][1]}, ${pointPositions[el.target][0] - 100} ${
        pointPositions[el.target][1]
      }, ${pointPositions[el.target][0]} ${pointPositions[el.target][1]}`}
      stroke="#006eff"
      fill="transparent"
    />
  );
};
