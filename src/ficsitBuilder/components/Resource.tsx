import styled from "styled-components";

export const Resource = ({
  desc,
  image,
  title,
}: {
  image: string;
  title: string;
  desc: string;
}) => {
  return (
    <Item>
      <ObjectIcon src={image} />
      <Information>
        <Name>{title}</Name>
        <Desc>{desc}</Desc>
      </Information>
    </Item>
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
  width: min-content;
  max-width: 150px;
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
