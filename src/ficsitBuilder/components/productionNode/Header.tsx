import styled from "styled-components";
import { itemsDescMap } from "../../data/types";

export const Header = ({ id }: { id: string }) => {
  const desc = itemsDescMap[id];

  return (
    <Wrapper>
      <Image src={desc.image} />
      <Name>{desc.name}</Name>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
