import styled from "styled-components";
import gameData from "../data/parsedData.json";
import { useStore } from "../../store";
import { Resource } from "./Resource";

export const ToAdd = () => {
  console.log(useStore.getState().nodes);

  return (
    <Wrapper>
      {gameData.meta.dataClassesByTopLevelClass.FGResourceDescriptor.map(
        (el) => {
          const image =
            el.mSmallIcon
              .replace(
                "Texture2D ",
                "http://localhost:5173/src/ficsitBuilder/resourses/images/"
              )
              .split(".")[0] + ".png";

          return (
            <Item
              key={el.ClassName}
              onClick={() => {
                useStore.getState().addNode({
                  id: el.ClassName + "_" + new Date().getTime(),
                  content: (
                    <Resource
                      desc={el.mDescription}
                      title={el.mDisplayName}
                      image={image}
                    />
                  ),
                  defaultPosition: [0, 0],
                });
              }}
            >
              <ObjectIcon src={image} />
              <Information>
                <Name>{el.mDisplayName}</Name>
                <Desc>{el.mDescription}</Desc>
              </Information>
            </Item>
          );
        }
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
  padding: 4px;
`;
