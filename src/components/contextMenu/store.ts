import { create } from "zustand";

type IContextStore = {
  position: [number, number];
  data: unknown;
  open: boolean;
};

export const useContextMenuStore = create<IContextStore>(() => ({
  position: [0, 0],
  data: null,
  open: false,
}));
