import { useEffect } from "react";
import { useContextMenuStore } from "../components/contextMenu/store";

export const useContextMenu = () => {
  const { open } = useContextMenuStore();

  useEffect(() => {
    const handleClick = () => {
      if (open) useContextMenuStore.setState({ open: false });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);
};
