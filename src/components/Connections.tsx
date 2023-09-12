import styled from "styled-components";
import { useStore } from "../store";

export const Connections = () => {
  const { preConnection, pointPositions, connections } = useStore();
  return (
    <SVG>
      {preConnection && (
        <path
          d={`M ${pointPositions[preConnection.startPoint][0]} ${
            pointPositions[preConnection.startPoint][1]
          }
          C ${pointPositions[preConnection.startPoint][0]} ${
            pointPositions[preConnection.startPoint][1]
          },
          ${preConnection.mouseCoords[0]} ${preConnection.mouseCoords[1]},
          ${preConnection.mouseCoords[0]} ${preConnection.mouseCoords[1]}`}
          stroke="grey"
          fill="transparent"
        />
      )}

      {connections.map((el) => (
        <path
          key={el.id + "_" + el.target}
          d={`M ${pointPositions[el.id][0]} ${pointPositions[el.id][1]} C ${
            pointPositions[el.id][0] + 100
          } ${pointPositions[el.id][1]}, ${
            pointPositions[el.target][0] - 100
          } ${pointPositions[el.target][1]}, ${pointPositions[el.target][0]} ${
            pointPositions[el.target][1]
          }`}
          stroke="#006eff"
          fill="transparent"
        />
      ))}
    </SVG>
  );
};

const SVG = styled.svg`
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: relative;
  z-index: 1;
`;
