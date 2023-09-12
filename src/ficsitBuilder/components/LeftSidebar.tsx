import styled from "styled-components";
import { ToAdd } from "./ToAdd";

export const LeftSidebar = () => {
  return (
    <Wrapper>
      <ToAdd />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: auto;
  max-height: 100vh;
  width: 300px;
  border-right: 1px solid #e6e6e6;
`;
