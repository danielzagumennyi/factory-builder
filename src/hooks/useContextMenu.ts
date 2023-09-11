import { useClick, useFloating, useInteractions } from "@floating-ui/react";
import { useState } from "react";
import { useContextPoint } from "./useContextPoint";

export const useContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const contextPoint = useContextPoint(context);
  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    contextPoint,
  ]);

  return {
    isOpen,
    getReferenceProps,
    getFloatingProps,
    floatingStyles,
    refs,
  };
};
