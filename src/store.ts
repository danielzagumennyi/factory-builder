import { create } from "zustand";

type IPoint = {
  id: string | number;
  el: HTMLElement;
};

export type IStore = {
  points: Record<string | number, IPoint[]>;
};

export const useStore = create<IStore>(() => ({
  points: {},
}));
