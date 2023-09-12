import { uniqBy } from "lodash-es";
import { ReactNode } from "react";
import { createWithEqualityFn } from "zustand/traditional";

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

export type IPreConnection<DATA> = {
  nodeId: string | number;
  outputPoint: string | number;
  inputPointData: DATA;
  inputPoint: string | number;
  mouseCoords: [number, number];
};

export type INode = {
  id: string;
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
  preConnection: IPreConnection<unknown> | null;

  addNode: (item: INode) => void;
  removeNode: (id: string | number) => void;
};

export const useStore = createWithEqualityFn<IStore>(
  (set) => ({
    canvas: null,

    preConnection: null,
    dragNode: null,

    addNode: (node) => {
      set((prev) => ({ ...prev, nodes: uniqBy([...prev.nodes, node], "id") }));
    },

    removeNode: (id) => {
      set((prev) => {
        const nodePoints = prev.points[id] || [];

        return {
          ...prev,
          nodes: prev.nodes.filter((n) => n.id !== id),
          connections: prev.connections.filter((c) => {
            return !nodePoints.some(
              (point) => point.id === c.id || point.id === c.target
            );
          }),
        };
      });
    },

    nodes: [
      // {
      //   id: "node1",
      //   content: (
      //     <Card>
      //       node1
      //       <FlexEnd>
      //         <Point id={"point1"} nodeId={"node1"} />
      //       </FlexEnd>
      //     </Card>
      //   ),
      // },
      // {
      //   id: "node2",
      //   content: (
      //     <Card>
      //       node2
      //       <Flex>
      //         <Point id={"point2"} nodeId={"node2"} />
      //       </Flex>
      //     </Card>
      //   ),
      // },
    ],
    connections: [],

    points: {},
    nodePositions: {},
    pointPositions: {},
  }),
  Object.is
);

window.useStore = useStore;
