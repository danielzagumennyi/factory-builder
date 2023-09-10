import styled from "styled-components";
import { NodeEditor } from "../../components/NodeEditor";

export const Editor = () => {
  return (
    <Wrapper>
      <NodeEditor />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  background: #f5f5f5;
`;
