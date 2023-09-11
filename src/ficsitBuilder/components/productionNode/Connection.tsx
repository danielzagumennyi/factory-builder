import styled, { css } from "styled-components";
import { ConnectionType, itemsDescMap } from "../../data/types";

export const Connection = ({
  id,
  count,
  isOutput,
}: ConnectionType & { isOutput?: boolean }) => {
  const desc = itemsDescMap[id];

  return (
    <Wrapper $isOutput={isOutput}>
      <ImageWrapper>
        <Image src={desc.image} />
      </ImageWrapper>
      <div>
        <Name>{desc.name}</Name>
        <Count>{count}</Count>
      </div>
    </Wrapper>
  );
};

const Image = styled.img`
  width: 20px;
  height: 20px;
`;

const ImageWrapper = styled.div`
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
