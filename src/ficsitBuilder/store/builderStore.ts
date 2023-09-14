import { create } from "zustand";

export type PositionType = [number, number];

export type NodeType<D = any> = {
  id: string;
  data: D;
  position: PositionType;
  inputs: string[];
  outputs: string[];
};

export type LinkType = {
  source: string;
  target: string;
};

export type BuilderStoreType<D = any> = {
  node: NodeType<D>[];
  links: LinkType[];
};

export const useBuilderStore = create<BuilderStoreType>(() => ({
  node: [
    {
      id: "1",
      position: [0, 0],
      data: {},
      inputs: [],
      outputs: [],
    },
  ],
  links: [],
}));
