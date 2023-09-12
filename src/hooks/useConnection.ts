import { useStore } from "../store";
import { getElementPosition, getRelativeMousePosition } from "../utils/utils";
import { usePoint } from "./usePoint";

export const useConnection = ({
  nodeId,
  pointId,
  ref,
}: {
  pointId: string | number;
  nodeId: string | number;
  ref: React.RefObject<HTMLDivElement>;
}) => {
  usePoint({ id: pointId, nodeId, ref });

  const startConnect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { canvas } = useStore.getState();

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const coords: [number, number] = [e.clientX - rect.x, e.clientY - rect.y];

    useStore.setState({
      preConnection: {
        startPoint: pointId,
        nodeId,
        endPoint: "",
        mouseCoords: coords,
      },
    });

    e.stopPropagation();
  };

  const selectEndPoint = (pointId: number | string) => {
    useStore.setState((prev) => ({
      ...prev,
      preConnection: prev.preConnection
        ? { ...prev.preConnection, endPoint: pointId }
        : null,
    }));
  };

  return { startConnect, selectEndPoint };
};

export const stopConnect = () => {
  useStore.setState((prev) => {
    const { preConnection, canvas, points } = prev;

    if (!canvas || !preConnection || !preConnection.endPoint) {
      return {
        ...prev,
        preConnection: null,
      };
    }

    const startPointEl = points[preConnection.nodeId].find(
      (el) => el.id === preConnection.startPoint
    )?.el;

    const endPointEl = points[preConnection.nodeId].find(
      (el) => el.id === preConnection.endPoint
    )?.el;

    const startPointPos = startPointEl
      ? getElementPosition(startPointEl, canvas)
      : prev.pointPositions[preConnection.startPoint];
    const endPointPos = endPointEl
      ? getElementPosition(endPointEl, canvas)
      : prev.pointPositions[preConnection.endPoint];

    return {
      ...prev,
      preConnection: null,
      pointPositions: {
        ...prev.pointPositions,
        [preConnection.startPoint]: startPointPos,
        [preConnection.endPoint]: endPointPos,
      },
      connections: [
        ...prev.connections,
        {
          id: preConnection.startPoint,
          target: preConnection.endPoint,
          nodeId: preConnection.nodeId,
        },
      ],
    };
  });
};

export const moveConnect = (e: React.MouseEvent<HTMLElement>) => {
  useStore.setState((prev) => {
    return {
      ...prev,
      preConnection: prev.preConnection
        ? {
            ...prev.preConnection,
            mouseCoords: getRelativeMousePosition(e),
          }
        : null,
    };
  });
};
