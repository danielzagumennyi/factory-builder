import React from "react";
import { IDragNode, useStore } from "../store";
import { getElementPosition, getRelativeMousePosition } from "../utils/utils";

export const useDrag = () => {
  const dragNode = useStore((s) => s.dragNode);

  const moveNode = (e: React.MouseEvent<HTMLElement>) => {
    if (!dragNode) return;
    const mouseCoords = getRelativeMousePosition(e);

    const position: [number, number] = [
      mouseCoords[0] - dragNode.offset[0],
      mouseCoords[1] - dragNode.offset[1],
    ];

    const points = useStore.getState().points[dragNode.id];
    const canvas = useStore.getState().canvas;

    const pointPositions = points.reduce<
      Record<string | number, [number, number]>
    >((acc, { id, el }) => {
      if (!canvas) return acc;

      acc[id] = getElementPosition(el, canvas);
      return acc;
    }, {});

    useStore.setState((prev) => ({
      ...prev,
      nodePositions: { ...prev.nodePositions, [dragNode.id]: position },
      pointPositions: { ...prev.pointPositions, ...pointPositions },
    }));
  };

  return { move: moveNode };
};

export const startDrag = (dragItem: IDragNode) => {
  useStore.setState({ dragNode: dragItem });
};

export const stopDrag = () => {
  useStore.setState({ dragNode: null });
};
