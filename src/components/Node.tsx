import { shallow } from "zustand/shallow";
import { startDrag } from "../hooks/useDrag";
import { useStore } from "../store";
import { getRelativeMousePosition } from "../utils/utils";

export const Node = ({ id }: { id: string | number }) => {
  const [x, y] = useStore((s) => s.nodePositions[id] || [0, 0], shallow);
  const content = useStore(
    (s) => s.nodes.find((s) => s.id === id)?.content,
    shallow
  );

  return (
    <div
      onMouseDown={(e) => {
        startDrag({
          id: id,
          offset: getRelativeMousePosition(e),
        });
      }}
      style={{
        position: "absolute",
        left: x + "px",
        top: y + "px",
        userSelect: "none",
        overflow: "visible",
        width: "min-content",
      }}
    >
      {content}
    </div>
  );
};
