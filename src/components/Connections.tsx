import styled from "styled-components";
import { useStore } from "../store";
import { Connection } from "./Connection";
import { PreConnection } from "./contextMenu/PreConnection";

export const Connections = () => {
  const connections = useStore((s) => s.connections);
  return (
    <SVG>
      <PreConnection />
      {connections.map((el) => (
        <Connection el={el} key={el.id} />
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
