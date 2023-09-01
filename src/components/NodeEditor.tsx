import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { useStore } from "../store";

export type IItem = {
  id: string | number;
  defaultPosition?: [number, number];
};

const getMouseCoords = (e: React.MouseEvent<HTMLElement>): [number, number] => {
  const rect = e.currentTarget.getBoundingClientRect();
  return [e.clientX - rect.x, e.clientY - rect.y];
};

type IDragItem = {
  id: string | number;
  offset: [number, number];
};

type IConnectItem = {
  id: string | number;
  nodeId: string | number;
  target: string | number;
};

type IPreConnection = IConnectItem & {
  startCoords: [number, number];
  endCoords: [number, number];
};

export const NodeEditor = ({
  items,
  connections,
  onChangeConnections,
}: {
  items: IItem[];
  onChangeItems: (items: IItem[]) => void;
  connections: IConnectItem[];
  onChangeConnections: (connections: IConnectItem[]) => void;
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [dragItem, setDragItem] = useState<IDragItem | null>(null);
  const [connectItem, setConnectItem] = useState<IPreConnection | null>(null);

  useEffect(() => {
    const handler = () => {
      setDragItem(null);
    };

    window.document.addEventListener("mouseup", handler);

    return () => {
      window.document.removeEventListener("mouseup", handler);
    };
  }, [dragItem]);

  const handleUp = () => {
    setDragItem(null);

    if (connectItem) {
      console.log(
        "🚀 ~ file: NodeEditor.tsx:69 ~ handleUp ~ connectItem:",
        connectItem
      );
      onChangeConnections([...connections, connectItem]);
      setConnectItem(null);
    }
  };

  const [positions, setPositions] = useState<
    Record<string | number, [number, number]>
  >({});

  const [pointPositions, setPointPositions] = useState<
    Record<string | number, [number, number]>
  >({});

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (dragItem) {
        const mouseCoords = getMouseCoords(e);

        setPositions((p) => {
          const coords: [number, number] = [
            mouseCoords[0] - dragItem.offset[0],
            mouseCoords[1] - dragItem.offset[1],
          ];

          return {
            ...p,
            [dragItem.id]: coords,
          };
        });

        const points = useStore.getState().points[dragItem.id];

        const pointPositions = points.reduce<
          Record<string | number, [number, number]>
        >((acc, { id, el }) => {
          const rect = el.getBoundingClientRect();
          acc[id] = [rect.x, rect.y];
          return acc;
        }, {});

        setPointPositions((prev) => ({ ...prev, ...pointPositions }));

        return;
      }

      if (connectItem) {
        setConnectItem({ ...connectItem, endCoords: getMouseCoords(e) });
      }
    },
    [connectItem, dragItem]
  );

  return (
    <>
      <Canvas ref={canvasRef} onMouseUp={handleUp} onMouseMove={handleMouse}>
        {items.map((el) => {
          const x = positions[el.id]?.[0] ?? el.defaultPosition?.[0] ?? 0;
          const y = positions[el.id]?.[1] ?? el.defaultPosition?.[1] ?? 0;
          return (
            <DragItem key={el.id} x={x} y={y} el={el} setDragItem={setDragItem}>
              <Card>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Eligendi molestias inventore dolore eaque
                <button>click me</button>
                <DotPoint
                  nodeId={el.id}
                  id={el.id + "_1"}
                  onMouseEnter={() => {
                    setConnectItem(null);
                    if (connectItem) {
                      console.log(connectItem);
                    }
                  }}
                  onMouseDown={(e) => {
                    if (!canvasRef.current) return;

                    const rect = canvasRef.current.getBoundingClientRect();

                    const coords: [number, number] = [
                      e.clientX - rect.x,
                      e.clientY - rect.y,
                    ];

                    setConnectItem({
                      id: el.id + "_1",
                      startCoords: coords,
                      endCoords: coords,
                      target: "",
                      nodeId: el.id,
                    });

                    e.stopPropagation();
                  }}
                />
              </Card>
            </DragItem>
          );
        })}
        <SVG>
          {connectItem && (
            <path
              d={`M ${connectItem.startCoords[0]} ${connectItem.startCoords[1]} C ${connectItem.startCoords[0]} ${connectItem.startCoords[1]}, ${connectItem.endCoords[0]} ${connectItem.endCoords[1]}, ${connectItem.endCoords[0]} ${connectItem.endCoords[1]}`}
              stroke="green"
              fill="transparent"
            />
          )}
          {connections.map((el) => (
            <path
              key={el.id}
              d={`M ${pointPositions[el.id][0]} ${pointPositions[el.id][1]} C ${
                pointPositions[el.target][0]
              } ${pointPositions[el.target][1]}, ${
                pointPositions[el.target][0]
              } ${pointPositions[el.target][1]}, ${
                pointPositions[el.target][0]
              } ${pointPositions[el.target][1]}`}
              stroke="blue"
              fill="transparent"
            />
          ))}
        </SVG>
      </Canvas>
    </>
  );
};

const DotPoint = ({
  id,
  nodeId,
  onMouseDown,
  onMouseEnter,
}: {
  id: number | string;
  nodeId: string | number;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const point = {
        id,
        el: ref.current,
      };

      useStore.setState((prev) => ({
        points: {
          ...prev.points,
          [nodeId]: [...(prev.points[nodeId] || []), point],
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
  }, [id, nodeId]);

  return (
    <Dot ref={ref} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter}></Dot>
  );
};

export type IContext = {
  el: IItem;
  x: number;
  y: number;
};

const SVG = styled.svg`
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Dot = styled.div`
  background-color: red;
  width: 25px;
  height: 25px;
  border-radius: 25px;
`;

const DragItem = ({
  el,
  x,
  y,
  setDragItem,
  children,
}: {
  el: IItem;
  setDragItem: React.Dispatch<React.SetStateAction<IDragItem | null>>;
  x: number;
  y: number;
  children: ReactNode;
}) => {
  return (
    <div
      key={el.id}
      onMouseDown={(e) =>
        setDragItem({
          id: el.id,
          offset: getMouseCoords(e),
        })
      }
      style={{
        position: "absolute",
        left: x + "px",
        top: y + "px",
        width: "100%",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};

const Canvas = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  background-color: #515151;
  padding: 10px;
  max-width: 200px;
  position: absolute;
  width: 100%;
`;
