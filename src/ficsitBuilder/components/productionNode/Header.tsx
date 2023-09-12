import styled from "styled-components";
import { itemsDescMap } from "../../data/types";

export const Header = ({ id }: { id: string }) => {
  const desc = itemsDescMap[id];

  return (
    <Wrapper>
      <Image src={desc.image} />
      <Overflow>
        <Name>{desc.name}</Name>
        <Desc>{desc.desc}</Desc>
      </Overflow>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  max-width: 100%;
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
  width: 100%;
`;

const Overflow = styled.div`
  overflow: hidden;
`;

const Desc = styled(Name)`
  font-weight: normal;
  font-size: 10px;
`;
