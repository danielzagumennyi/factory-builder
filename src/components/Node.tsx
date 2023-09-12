import { shallow } from "zustand/shallow";
import { startDrag } from "../hooks/useDrag";
import { useStore } from "../store";
import { getRelativeMousePosition } from "../utils/utils";
import { createContext } from "react";

export const NodeContext = createContext<string>("");

export const Node = ({ id }: { id: string }) => {
  const [x, y] = useStore((s) => s.nodePositions[id] || [0, 0], shallow);
  const content = useStore(
    (s) => s.nodes.find((s) => s.id === id)?.content,
    shallow
  );

  return (
    <div
      onMouseDown={(e) => {
        if (e.button !== 0) return;
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
        zIndex: 1,
      }}
    >
      <NodeContext.Provider value={id}>{content}</NodeContext.Provider>
    </div>
  );
};
