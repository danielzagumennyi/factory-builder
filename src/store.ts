import { create } from "zustand";

export type IStore = {
  nodes: Record<
    string | number,
    {
      points: Array<{
        id: string | number;
        el: HTMLElement;
      }>;
    }
  >;
};

export const useStore = create<IStore>(() => ({
  nodes: {},
}));
