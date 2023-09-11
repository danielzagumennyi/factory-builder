import styled from "styled-components";
import { useStore } from "../../store";
import { addableNodes } from "../data/addableNodes";
import { productionNodesList } from "../data/types";
import { Resource } from "./Resource";
import { ProductionNode } from "./productionNode/ProductionNode";

export const ToAdd = () => {
  return (
    <Wrapper>
      {productionNodesList.map((el) => (
        <ProductionNode data={el} key={el.id} />
      ))}
    </Wrapper>
  );

  return (
    <Wrapper>
      {addableNodes.map((category) =>
        category.nodes.map((el) => {
          return (
            <Item
              key={el.id}
              onClick={() => {
                const id = el.id + "_" + new Date().getTime();
                useStore.getState().addNode({
                  id,
                  content: <Resource data={el.data} />,
                  defaultPosition: [0, 0],
                });
              }}
            >
              <ObjectIcon src={el.data.image} />
              <Information>
                <Name>{el.data.mDisplayName}</Name>
                <Desc>{el.data.mDescription}</Desc>
              </Information>
            </Item>
          );
        })
      )}
    </Wrapper>
  );
};

const Information = styled.div`
  overflow: hidden;
`;

const ObjectIcon = styled.img`
  max-width: 32px;
  max-height: 32px;
`;

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

const Name = styled.p`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Desc = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
`;

const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 54px;
`;
