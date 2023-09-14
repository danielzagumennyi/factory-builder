import { createContext } from "react";
import { shallow } from "zustand/shallow";
import { useDrag } from "../ficsitBuilder/hooks/useMouseDrag";
import { useKeysDrag } from "../ficsitBuilder/hooks/useKeysDrag";
import { useStore } from "../store";

export const NodeContext = createContext<string>("");

export const Node = ({ id }: { id: string }) => {
  const content = useStore(
    (s) => s.nodes.find((s) => s.id === id)?.content,
    shallow
  );

  const keyDrag = useKeysDrag(id);
  const dragProps = useDrag(id);

  return (
    <div {...keyDrag} {...dragProps}>
      <NodeContext.Provider value={id}>{content}</NodeContext.Provider>
    </div>
  );
};
