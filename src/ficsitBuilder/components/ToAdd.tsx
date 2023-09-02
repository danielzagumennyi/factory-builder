import styled from "styled-components";
import gameData from "../data/parsedData.json";

export const ToAdd = () => {
  return (
    <Wrapper>
      {gameData.meta.dataClassesByTopLevelClass.FGResourceDescriptor.map(
        (el) => (
          <Item key={el.ClassName}>
            <Name>{el.mDisplayName}</Name>
            <Desc>{el.mDescription}</Desc>
          </Item>
        )
      )}
    </Wrapper>
  );
};

const Item = styled.div`
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
  padding: 4px;
`;
