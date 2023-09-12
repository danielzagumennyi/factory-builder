import { useStore } from "../../store";

export const PreConnection = () => {
  // const { isValid, isError } = useStore

  const { preConnection: con, pointPositions: pos } = useStore();
  return con ? (
    <path
      d={`M ${pos[con.outputPoint][0]} ${pos[con.outputPoint][1]}
          C ${pos[con.outputPoint][0]} ${pos[con.outputPoint][1]},
            ${con.mouseCoords[0]} ${con.mouseCoords[1]},
            ${con.mouseCoords[0]} ${con.mouseCoords[1]}`}
      stroke="grey"
      fill="transparent"
    />
  ) : null;
};
