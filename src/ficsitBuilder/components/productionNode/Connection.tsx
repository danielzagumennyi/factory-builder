import styled, { css } from "styled-components";
import { ConnectionType, itemsDescMap } from "../../data/types";
import { useContext, useRef } from "react";
import { useConnection } from "../../../hooks/useConnection";
import { usePoint } from "../../../hooks/usePoint";
import { NodeContext } from "../../../components/Node";
import { useStore } from "../../../store";

export const Connection = ({
  id,
  count,
  isOutput,
}: ConnectionType & { isOutput?: boolean }) => {
  const nodeId = useContext(NodeContext);

  const desc = itemsDescMap[id];

  const ref = useRef<HTMLDivElement>(null);

  const connectionId = nodeId + "_" + id;

  // const isConnected = useStore(
  //   (s) =>
  //     !!s.connections.find(
  //       (s) => s.id === connectionId || s.target === connectionId
  //     )
  // );

  const isSelected = useStore(
    (s) =>
      s.preConnection?.startPoint === connectionId ||
      s.preConnection?.endPoint === connectionId
  );

  const { startConnect, selectEndPoint } = useConnection({
    nodeId,
    pointId: connectionId,
    ref,
  });

  return (
    <Wrapper
      $isOutput={isOutput}
      onMouseEnter={isSelected ? undefined : () => selectEndPoint(connectionId)}
      onMouseDown={startConnect}
    >
      <ImageWrapper>
        <Image src={desc.image} />
        <ConnectionSource ref={ref} />
      </ImageWrapper>
      <div>
        <Name>{desc.name}</Name>
        <Count>{count}</Count>
      </div>
    </Wrapper>
  );
};

const ConnectionSource = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: red;
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
