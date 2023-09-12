import styled from "styled-components";
import { productionNodesList } from "../data/types";
import { Header } from "./productionNode/Header";
import { useStore } from "../../store";
import { ProductionNode } from "./productionNode/ProductionNode";

export const ToAdd = () => {
  return (
    <Wrapper>
      {productionNodesList.map((el) => (
        <Item
          key={el.id}
          onClick={() => {
            useStore.getState().addNode({
              id: el.id + "_" + new Date().getTime(),
              content: <ProductionNode data={el} />,
              defaultPosition: [0, 0],
            });
          }}
        >
          <Header id={el.id} />
        </Item>
      ))}
    </Wrapper>
  );
};

const Item = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px;
  border: 1px solid #e6e6e6;
  cursor: pointer;

  &:hover {
    border-color: #006eff;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
`;
