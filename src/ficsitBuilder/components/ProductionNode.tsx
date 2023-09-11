import styled from "styled-components";
import { useContextMenuTrigger } from "../../components/contextMenu/useContextMenuTrigger";
import { ProductionNodeType } from "../data/addableNodes";
import { useState } from "react";
import Select from "react-select";

export const ProductionNode = ({ data }: { data: ProductionNodeType }) => {
  const handleContext = useContextMenuTrigger(data);

  const [prodRecipe, setProdRecipe] = useState<string>("");

  const options = data.recipes.map((r) => ({
    value: r.id,
    label: (
      <Flex>
        <RecipeIcon src={r.image} />
        {r.name}
      </Flex>
    ),
  }));

  return (
    <Item onContextMenu={handleContext}>
      <Flex>
        <ObjectIcon src={data.image} />
        <Information>
          <Name>{data.name}</Name>
          <Desc>{data.desc}</Desc>
        </Information>
      </Flex>

      <Select options={options} />
    </Item>
  );
};

const RecipeIcon = styled.img`
  max-width: 16px;
  max-height: 16px;
`;

const Flex = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
`;

const Information = styled.div`
  overflow: hidden;
`;

const ObjectIcon = styled.img`
  max-width: 32px;
  max-height: 32px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;
  border: 1px solid #e6e6e6;
  background-color: #fff;

  &:hover {
    border-color: #006eff;
  }
`;

const Name = styled.p`
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 4px;
`;

const Desc = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
`;
