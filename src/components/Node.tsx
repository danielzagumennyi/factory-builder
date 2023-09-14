import { createContext } from "react";
import { shallow } from "zustand/shallow";
import { useDragProps } from "../hooks/useDragProps";
import { useKeysDrag } from "../hooks/useKeysDrag";
import { useStore } from "../store";

export const NodeContext = createContext<string>("");

export const Node = ({ id }: { id: string }) => {
  const content = useStore(
    (s) => s.nodes.find((s) => s.id === id)?.content,
    shallow
  );

  const keyDrag = useKeysDrag(id);
  const dragProps = useDragProps(id);

  return (
    <div {...keyDrag} {...dragProps}>
      <NodeContext.Provider value={id}>{content}</NodeContext.Provider>
    </div>
  );
};
