import styled from "styled-components";
import { useDrag } from "../hooks/useMouseDrag";
import {
  NodeType,
  calculateSelector,
  useBuilderStore,
} from "../store/builderStore";
import { useKeysDrag } from "../hooks/useKeysDrag";

export const NumberNode = ({ data }: { data: NodeType }) => {
  const mouseDragProps = useDrag(data);
  const keysDragProps = useKeysDrag(data.id);

  const values = useBuilderStore(calculateSelector);

  return (
    <div {...mouseDragProps} {...keysDragProps}>
      <Wrapper>
        <div>Value: {data.data}</div>
        <div>Sum value: {values[data.id]}</div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  padding: 16px;
  border: 1px solid #e1e1e1;
  background-color: #fff;
  width: 250px;
`;
