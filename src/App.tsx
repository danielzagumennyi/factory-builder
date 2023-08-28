import { Canvas } from "./components/Canvas";
import { GlobalStyles, ResetStyles } from "./components/styled/Common";

function App() {
  return (
    <>
      <ResetStyles />
      <GlobalStyles />

      <Canvas />
    </>
  );
}

export default App;
