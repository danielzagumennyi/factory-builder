import styled from "styled-components";
import { treeSelector, useBuilderStore } from "../store/builderStore";
import { NumberNode } from "./NumberNode";
import { useEffect, useRef } from "react";
import { Links } from "./Links";

export const Editor = () => {
  const { nodes } = useBuilderStore();
  const canvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvas.current) {
      useBuilderStore.setState({ canvas: canvas.current });
    }
  }, []);

  const tree = useBuilderStore(treeSelector);

  console.log(tree);

  return (
    <Wrapper>
      <Canvas ref={canvas}>
        <Links />
        {nodes.map((node) => (
          <NumberNode data={node} key={node.id} />
        ))}
      </Canvas>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  background: #f5f5f5;
`;

const Canvas = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
