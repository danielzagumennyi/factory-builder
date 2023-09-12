import { useStore } from "../store";
import { getElementPosition, getRelativeMousePosition } from "../utils/utils";
import { usePoint } from "./usePoint";

export const useConnection = <DATA>({
  nodeId,
  pointId,
  ref,
  isInput = true,
  isOutput = true,
  data,
  connectValidation = () => true,
}: {
  pointId: string | number;
  nodeId: string | number;
  ref: React.RefObject<HTMLDivElement>;
  data?: DATA;
  connectValidation?: (connectionData: DATA | undefined) => boolean;
  isInput?: boolean;
  isOutput?: boolean;
}) => {
  usePoint({ id: pointId, nodeId, ref });

  const startConnect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isOutput) return;

    const { canvas } = useStore.getState();

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const coords: [number, number] = [e.clientX - rect.x, e.clientY - rect.y];

    useStore.setState({
      preConnection: {
        inputPointData: data,
        outputPoint: pointId,
        nodeId,
        inputPoint: "",
        mouseCoords: coords,
      },
    });

    e.stopPropagation();
  };

  const selectEndPoint = (pointId: number | string) => {
    if (!isInput) return;

    const { preConnection } = useStore.getState();

    if (
      preConnection &&
      connectValidation(preConnection.inputPointData as DATA)
    ) {
      useStore.setState((prev) => ({
        ...prev,
        preConnection: prev.preConnection
          ? { ...prev.preConnection, inputPoint: pointId }
          : null,
      }));
    }
  };

  const removeEndPoint = () => {
    useStore.setState((prev) => ({
      ...prev,
      preConnection: prev.preConnection
        ? { ...prev.preConnection, inputPoint: "" }
        : null,
    }));
  };

  return {
    onMouseEnter: () => selectEndPoint(pointId),
    onMouseLeave: removeEndPoint,
    onMouseDown: startConnect,
  };
};

export const stopConnect = () => {
  useStore.setState((prev) => {
    const { preConnection, canvas, points } = prev;

    if (!canvas || !preConnection || !preConnection.inputPoint) {
      return {
        ...prev,
        preConnection: null,
      };
    }

    const startPointEl = points[preConnection.nodeId].find(
      (el) => el.id === preConnection.outputPoint
    )?.el;

    const endPointEl = points[preConnection.nodeId].find(
      (el) => el.id === preConnection.inputPoint
    )?.el;

    const startPointPos = startPointEl
      ? getElementPosition(startPointEl, canvas)
      : prev.pointPositions[preConnection.outputPoint];
    const endPointPos = endPointEl
      ? getElementPosition(endPointEl, canvas)
      : prev.pointPositions[preConnection.inputPoint];

    return {
      ...prev,
      preConnection: null,
      pointPositions: {
        ...prev.pointPositions,
        [preConnection.outputPoint]: startPointPos,
        [preConnection.inputPoint]: endPointPos,
      },
      connections: [
        ...prev.connections,
        {
          id: preConnection.outputPoint,
          target: preConnection.inputPoint,
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
