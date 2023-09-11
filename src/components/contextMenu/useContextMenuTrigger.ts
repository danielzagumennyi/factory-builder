import { useCallback } from "react";
import { useContextMenuStore } from "./store";

export const useContextMenuTrigger = (data: unknown) => {
  return useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();

      useContextMenuStore.setState({
        position: [e.clientX, e.clientY],
        open: true,
        data,
      });
    },
    [data]
  );
};
