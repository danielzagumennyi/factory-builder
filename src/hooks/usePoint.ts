import { useEffect } from "react";
import { useStore } from "../store";
import { getElementPosition } from "../utils/utils";

export const usePoint = ({
  nodeId,
  id,
  ref,
}: {
  nodeId: string | number;
  id: string | number;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    const { canvas } = useStore.getState();

    if (ref.current && canvas) {
      const point = {
        id,
        el: ref.current,
      };

      const position = getElementPosition(ref.current, canvas);

      useStore.setState((prev) => ({
        points: {
          ...prev.points,
          [nodeId]: [...(prev.points[nodeId] || []), point],
        },
        pointPositions: {
          ...prev.pointPositions,
          [id]: position,
        },
      }));
    }

    return () => {
      useStore.setState((prev) => ({
        points: {
          ...prev.points,
          [nodeId]: prev.points[nodeId].filter((el) => el.id !== id),
        },
      }));
    };
  }, [id, nodeId, ref]);
};
