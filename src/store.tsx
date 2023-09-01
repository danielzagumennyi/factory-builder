import { ReactNode } from "react";
import { createWithEqualityFn } from "zustand/traditional";
import { Card, Flex, FlexEnd } from "./components/styled/Other";
import { Point } from "./components/Point";

export type IPoint = {
  id: string | number;
  el: HTMLElement;
};

export type IDragNode = {
  id: string | number;
  offset: [number, number];
};

export type IConnectItem = {
  id: string | number;
  nodeId: string | number;
  target: string | number;
};

export type IPreConnection = {
  nodeId: string | number;
  startPoint: string | number;
  endPoint: string | number;
  mouseCoords: [number, number];
};

export type INode = {
  id: string | number;
  defaultPosition?: [number, number];
  content: ReactNode;
};

export type IStore = {
  canvas: HTMLElement | null;
  points: Record<string | number, IPoint[]>;
  nodes: INode[];
  connections: IConnectItem[];
  dragNode: IDragNode | null;
  nodePositions: Record<string | number, [number, number]>;
  pointPositions: Record<string | number, [number, number]>;
  preConnection: IPreConnection | null;
};

export const useStore = createWithEqualityFn<IStore>(
  () => ({
    canvas: null,

    preConnection: null,
    dragNode: null,

    nodes: [
      {
        id: "node1",
        content: (
          <Card>
            node1
            <FlexEnd>
              <Point id={"point1"} nodeId={"node1"} />
            </FlexEnd>
          </Card>
        ),
      },
      {
        id: "node2",
        content: (
          <Card>
            node2
            <Flex>
              <Point id={"point2"} nodeId={"node2"} />
            </Flex>
          </Card>
        ),
      },
    ],
    connections: [],

    points: {},
    nodePositions: {},
    pointPositions: {},
  }),
  Object.is
);
