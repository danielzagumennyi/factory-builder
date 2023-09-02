import styled from "styled-components";
import { GlobalStyles, ResetStyles } from "./components/styled/Common";
import { FicsitBuilder } from "./ficsitBuilder/FicsitBuilder";

function App() {
  return (
    <Wrapper>
      <ResetStyles />
      <GlobalStyles />

      <FicsitBuilder />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

export default App;
