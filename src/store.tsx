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
  output: string | number;
  input: string | number;
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
  nodes: INode[];
  pointsByNodes: Record<string | number, IPoint[]>;
  connections: IConnectItem[];
  dragNode: IDragNode | null;
  nodePositions: Record<string | number, [number, number]>;
  pointPositions: Record<string | number, [number, number]>;
  preConnection: IPreConnection<unknown> | null;
  pointsData: Record<string, unknown>;

  addNode: (item: INode) => void;
  removeNode: (id: string | number) => void;
};

export const useStore = createWithEqualityFn<IStore>(
  (set) => ({
    canvas: null,
    pointsData: {},

    preConnection: null,
    dragNode: null,

    addNode: (node) => {
      set((prev) => ({ ...prev, nodes: uniqBy([...prev.nodes, node], "id") }));
    },

    removeNode: (id) => {
      set((prev) => {
        const nodePoints = prev.pointsByNodes[id] || [];

        return {
          ...prev,
          nodes: prev.nodes.filter((n) => n.id !== id),
          connections: prev.connections.filter((c) => {
            return !nodePoints.some(
              (point) => point.id === c.output || point.id === c.input
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

    pointsByNodes: {},
    nodePositions: {},
    pointPositions: {},
  }),
  Object.is
);

window.useStore = useStore;
