import { useState } from "react";
import styled from "styled-components";
import { IItem, NodeEditor } from "./components/NodeEditor";
import { GlobalStyles, ResetStyles } from "./components/styled/Common";

function App() {
  const [items, setItems] = useState<IItem[]>([
    {
      id: "0",
      content: (
        <Card>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          molestias inventore dolore eaque
          <button>click me</button>
        </Card>
      ),
    },
    {
      id: "1",
      content: (
        <Card>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          molestias inventore dolore eaque
        </Card>
      ),
    },
  ]);

  return (
    <Wrapper>
      <ResetStyles />
      <GlobalStyles />

      <Border>
        <NodeEditor items={items} />
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

const Card = styled.div`
  background-color: #515151;
  padding: 10px;
  max-width: 200px;
  position: absolute;
  width: 100%;
`;

export default App;
