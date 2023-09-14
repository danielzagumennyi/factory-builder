import { useStore } from "../store";
import { moveNode } from "./useDrag";

export const useKeysDrag = (
  id: string | number,
  getStep: (e: React.KeyboardEvent) => number = () => 10
) => {
  const onKeyUp = (e: React.KeyboardEvent) => {
    const [x, y] = useStore.getState().nodePositions[id];
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