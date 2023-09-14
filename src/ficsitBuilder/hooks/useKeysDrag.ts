import { useBuilderStore } from "../store/builderStore";

export const useKeysDrag = (
  id: string,
  getStep: (e: React.KeyboardEvent) => number = () => 10
) => {
  const moveNode = useBuilderStore((s) => s.moveNode);

  const onKeyUp = (e: React.KeyboardEvent) => {
    const [x, y] = useBuilderStore.getState().nodePositions[id];
    const step = getStep(e);

    if (e.key === "ArrowUp") {
      moveNode(id, [x, y - step]);
    }
    if (e.key === "ArrowRight") {
      moveNode(id, [x + step, y]);
    }
    if (e.key === "ArrowDown") {
      moveNode(id, [x, y + step]);
    }
    if (e.key === "ArrowLeft") {
      moveNode(id, [x - step, y]);
    }
  };

  return {
    tabIndex: 0,
    onKeyUp,
  };
};
