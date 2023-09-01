import { useState } from "react";
import styled from "styled-components";
import { IItem, NodeEditor } from "./components/NodeEditor";
import { GlobalStyles, ResetStyles } from "./components/styled/Common";

function App() {
  const [items, setItems] = useState<IItem[]>([
    {
      id: "0",
    },
    {
      id: "1",
    },
  ]);

  const [connections, setConnections] = useState([]);

  return (
    <Wrapper>
      <ResetStyles />
      <GlobalStyles />

      <Border>
        <NodeEditor
          items={items}
          connections={connections}
          onChangeConnections={setConnections}
        />
      </Border>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 500px 30px 100px;
  width: 100%;
`;

const Border = styled.div`
  border: 1px dotted grey;
  height: 500px;
`;

export default App;
