import { useContext, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { NodeContext } from "../../../components/Node";
import { useContextMenuTrigger } from "../../../components/contextMenu/useContextMenuTrigger";
import { useConnections } from "../../../hooks/useConnections";
import { ProductionNodeType, RecipeType, itemsDescMap } from "../../data/types";
import { ConnectDataType, Connection } from "./Connection";
import { Header } from "./Header";
import { useStore } from "../../../store";

export const ProductionNode = ({ data }: { data: ProductionNodeType }) => {
  const nodeId = useContext(NodeContext);
  const handleContext = useContextMenuTrigger(nodeId);

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

  const connections = useConnections();

  const inputs: ConnectDataType[] =
    prodRecipe?.input.map((el) => {
      const relatedConnection = connections.find((c) =>
        c.output.toString().endsWith(el.id)
      );

      const production = relatedConnection
        ? (
            useStore.getState().pointsData[
              relatedConnection.output
            ] as ConnectDataType
          ).productionQuantity
        : 0;

      return {
        itemId: el.id,
        productionQuantity: production,
        requiredQuantity: el.count,
      };
    }) || [];

  const prodEffectivity = Math.min(
    ...inputs.map((el) => el.productionQuantity / el.requiredQuantity)
  );

  const production: ConnectDataType[] =
    prodRecipe?.output.map((el) =>
      ["copperOre", "ironOre"].includes(el.id)
        ? {
            itemId: el.id,
            productionQuantity: el.count * 2,
            requiredQuantity: el.count,
          }
        : {
            itemId: el.id,
            productionQuantity: Math.min(el.count * prodEffectivity, el.count),
            requiredQuantity: el.count,
          }
    ) || [];

  return (
    <Wrapper onContextMenu={handleContext}>
      <Header id={data.id} />
      <Select options={options} onChange={(v) => v && setProdRecipe(v)} />
      <Connections>
        <div>
          {inputs.map((el) => (
            <Connection
              pointId={nodeId + "/" + el.itemId}
              key={el.itemId}
              data={el}
              isInput
            />
          ))}
        </div>
        <div>
          {production.map((el) => (
            <Connection
              pointId={nodeId + "/" + el.itemId}
              key={el.itemId}
              data={el}
              isOutput
            />
          ))}
        </div>
      </Connections>
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
