import { getRelativeMousePosition } from "../../utils/utils";
import { NodeType, useBuilderStore } from "../store/builderStore";

export const useDrag = (node: NodeType) => {
  const [x, y] = useBuilderStore((s) => s.nodePositions[node.id] || [0, 0]);
  const { moveNode, canvas } = useBuilderStore();

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    console.log("start drag");

    useBuilderStore.setState({
      dragNode: {
        id: node.id,
        offset: getRelativeMousePosition(e),
      },
    });

    const onMouseMove = (e: MouseEvent) => {
      const { dragNode } = useBuilderStore.getState();
      if (!dragNode) return;

      const mouseCoords = getRelativeMousePosition(e);

      const position: [number, number] = [
        mouseCoords[0] - dragNode.offset[0],
        mouseCoords[1] - dragNode.offset[1],
      ];

      moveNode(dragNode.id, position);
    };

    const onMouseUp = () => {
      console.log("end drag");

      useBuilderStore.setState({ dragNode: null });
      canvas?.addEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    canvas?.addEventListener("mousemove", onMouseMove);
    document?.addEventListener("mouseup", onMouseUp);
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
