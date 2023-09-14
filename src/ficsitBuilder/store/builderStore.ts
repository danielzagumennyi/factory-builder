import { create } from "zustand";

export type PositionType = [number, number];

export type NodeType<D = any> = {
  id: string;
  data: D;
};

export type LinkType = {
  source: string;
  target: string;
};

export type DragNodeType = {
  id: string;
  offset: [number, number];
};

export type BuilderStoreType<D = any> = {
  canvas: HTMLElement | null;
  nodes: NodeType<D>[];
  links: LinkType[];
  nodePositions: Record<string | number, [number, number]>;
  dragNode: DragNodeType | null;
  preConnection: PreConnectionType<unknown> | null;

  moveNode: (id: string, position: PositionType) => void;
};

export type PreConnectionType<D> = {
  source: NodeType<D>;
  target: NodeType<D> | null;
  mouseCoords: [number, number];
};

export const useBuilderStore = create<BuilderStoreType>((set, get) => ({
  moveNode: (id, position) => {
    set((prev) => ({
      ...prev,
      nodePositions: { ...prev.nodePositions, [id]: position },
    }));
  },

  nodes: [
    {
      id: "1",
      data: 1,
    },
    {
      id: "2",
      data: 2,
    },
    {
      id: "3",
      data: 3,
    },
    {
      id: "4",
      data: 4,
    },
    {
      id: "5",
      data: 5,
    },
    {
      id: "6",
      data: 6,
    },
  ],
  links: [
    {
      source: "1",
      target: "3",
    },
    {
      source: "2",
      target: "3",
    },
    {
      source: "3",
      target: "4",
    },
    {
      source: "5",
      target: "4",
    },
  ],
  nodePositions: {
    "1": [0, 0],
    "2": [0, 100],
    "3": [0, 200],
    "4": [500, 0],
    "5": [500, 100],
    "6": [500, 200],
  },
  canvas: null,
  dragNode: null,
  preConnection: null,
}));

export const calculateSelector = (state: BuilderStoreType<number>) => {
  return state.nodes.reduce<Record<string, number>>((acc, node) => {
    const totalValue = state.links
      .filter((link) => link.target === node.id)
      .map((link) => {
        return state.nodes.find((node) => node.id === link.source)?.data || 0;
      })
      .reduce((acc, val) => acc + val, 0);

    acc[node.id] = totalValue + node.data;

    return acc;
  }, {});
};

export const treeSelector = (state: BuilderStoreType<number>) => {
  const mapLink = state.links.reduce<Record<string, string[]>>((acc, val) => {
    acc[val.source] = [val.target];

    return acc;
  }, {});

  const findChild = (link: LinkType) => {
    state.links.forEach((_link) => {
      if (link.target === _link.source) {
        mapLink[link.source] = [
          ...new Set([...(mapLink[link.source] || []), _link.source]),
        ];
      }
    });
  };

  state.links.forEach(findChild);

  return mapLink;
};
