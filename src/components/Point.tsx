import { useRef } from "react";
import styled, { css } from "styled-components";
import { usePoint } from "../hooks/usePoint";
import { useStore } from "../store";
import { useConnection } from "../hooks/useConnection";

export const Point = ({
  id,
  nodeId,
}: {
  id: number | string;
  nodeId: string | number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  usePoint({ id, nodeId, ref });

  const isConnected = useStore(
    (s) => !!s.connections.find((s) => s.id === id || s.target === id)
  );

  const isSelected = useStore(
    (s) =>
      s.preConnection?.startPoint === id || s.preConnection?.endPoint === id
  );

  const { startConnect, selectEndPoint } = useConnection({
    nodeId,
    pointId: id,
  });

  return (
    <Dot
      $connected={isConnected}
      $selected={isSelected}
      ref={ref}
      onMouseEnter={isSelected ? undefined : () => selectEndPoint(id)}
      onMouseDown={startConnect}
    />
  );
};

const Dot = styled.div<{ $connected?: boolean; $selected?: boolean }>`
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    border: 4px solid #444444;
    transform: translate(-50%, -50%);
  }

  &:hover {
    &::before {
      border-color: #353535;
    }
  }

  ${(p) =>
    p.$connected &&
    css`
      &::before {
        border-color: #006eff;
      }
    `}

  ${(p) =>
    p.$selected &&
    css`
      &::before {
        border-color: #006eff;
      }
    `}
`;
