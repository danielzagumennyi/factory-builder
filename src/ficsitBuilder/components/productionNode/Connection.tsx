import { useId, useRef } from "react";
import styled, { css } from "styled-components";
import { useConnection } from "../../../hooks/useConnection";
import { itemsDescMap } from "../../data/types";

export type ConnectDataType = {
  itemId: string;
  requiredQuantity: number;
  productionQuantity: number;
};

export const Connection = <DATA extends ConnectDataType>({
  isOutput = false,
  isInput = false,
  data,
  pointId,
}: {
  pointId: string;
  isOutput?: boolean;
  isInput?: boolean;
  data: DATA;
}) => {
  const itemData = itemsDescMap[data.itemId];

  const ref = useRef<HTMLDivElement>(null);

  const { onMouseDown, onMouseEnter, onMouseLeave } = useConnection({
    pointId,
    ref,
    data,
    isOutput,
    isInput,
    connectValidation: (inputData) => {
      return inputData?.itemId === itemData?.id;
    },
  });

  return (
    <Wrapper $isOutput={isOutput}>
      <ImageWrapper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
      >
        <Image src={itemData.image} />
        <ConnectionSource ref={ref} />
      </ImageWrapper>
      <div>
        <Name>{itemData.name}</Name>
        <Count>
          {data.productionQuantity}/{data.requiredQuantity}
        </Count>
      </div>
    </Wrapper>
  );
};

const ConnectionSource = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  pointer-events: none;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e1e1e1;
  border-radius: 28px;
  background-color: #fff;
  flex-shrink: 0;
`;

const Name = styled.div`
  font-size: 10px;
`;

const Count = styled.div`
  font-size: 10px;
  font-weight: bold;
`;

const Wrapper = styled.div<{ $isOutput?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;

  margin-left: -30px;

  ${(p) =>
    p.$isOutput &&
    css`
      text-align: right;
      flex-direction: row-reverse;
      margin-right: -30px;
    `}
`;
