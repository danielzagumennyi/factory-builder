import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import { getRelativeMousePosition } from "../utils/utils";
import { startDrag } from "./useDrag";

export const useDragProps = (id: string | number) => {
  const [x, y] = useStore((s) => s.nodePositions[id] || [0, 0], shallow);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    startDrag({
      id: id,
      offset: getRelativeMousePosition(e),
    });
  };

  const style: React.CSSProperties = {
    position: "absolute",
    left: x + "px",
    top: y + "px",
    overflow: "visible",
    width: "min-content",
    zIndex: 1,
  };

  return {
    onMouseDown,
    style,
  };
};
