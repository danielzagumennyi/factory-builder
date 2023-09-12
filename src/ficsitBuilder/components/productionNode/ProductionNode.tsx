import styled from "styled-components";
import { useContextMenuTrigger } from "../../../components/contextMenu/useContextMenuTrigger";
import { useState } from "react";
import Select from "react-select";
import { ProductionNodeType, RecipeType, itemsDescMap } from "../../data/types";
import { Header } from "./Header";
import { Connection } from "./Connection";

export const ProductionNode = ({ data }: { data: ProductionNodeType }) => {
  const handleContext = useContextMenuTrigger(data);

  const [prodRecipe, setProdRecipe] = useState<RecipeType | null>(null);

  const options = data.recipes.map((r) => {
    const desc = itemsDescMap[r.id];

    return {
      value: r.id,
      label: (
        <Flex>
          <RecipeIcon src={desc.image} />
          {desc.name}
        </Flex>
      ),
      ...r,
    };
  });

  return (
    <Wrapper onContextMenu={handleContext}>
      <Header id={data.id} />
      <Select options={options} onChange={(v) => v && setProdRecipe(v)} />
      {prodRecipe && (
        <Connections>
          <div>
            {prodRecipe.input.map((el) => (
              <Connection id={el.id} count={el.count} key={el.id} isInput />
            ))}
          </div>
          <div>
            {prodRecipe.output.map((el) => (
              <Connection id={el.id} count={el.count} key={el.id} isOutput />
            ))}
          </div>
        </Connections>
      )}
    </Wrapper>
  );
};

const Connections = styled.div`
  display: flex;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }
`;

const RecipeIcon = styled.img`
  max-width: 16px;
  max-height: 16px;
`;

const Flex = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e1e1e1;
  background-color: #fff;
  width: 250px;

  &:hover {
    border-color: #006eff;
  }
`;
