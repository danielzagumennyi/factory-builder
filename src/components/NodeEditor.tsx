import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { stopDrag, useDrag } from "../hooks/useDrag";
import { useStore } from "../store";
import { Connections } from "./Connections";
import { Node } from "./Node";
import { moveConnect, stopConnect } from "../hooks/useConnection";

const handleUp = () => {
  stopDrag();
  stopConnect();
};

export const NodeEditor = () => {
  const nodes = useStore((s) => s.nodes);

  const { move } = useDrag();

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      move(e);
      moveConnect(e);
    },
    [move]
  );

  useEffect(() => {
    window.document.addEventListener("mouseup", handleUp);
    return () => window.document.removeEventListener("mouseup", handleUp);
  }, []);

  return (
    <>
      <Canvas
        ref={(el) => useStore.setState({ canvas: el })}
        onMouseMove={handleMove}
      >
        {nodes.map((el) => (
          <Node id={el.id} key={el.id} />
        ))}
        <Connections />
      </Canvas>
    </>
  );
};

const Canvas = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
