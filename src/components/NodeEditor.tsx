import React, {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

export type IItem = {
  id: string | number;
  content: ReactNode;
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

export const NodeEditor = ({ items }: { items: IItem[] }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const [dragItem, setDragItem] = useState<IDragItem | null>(null);

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
  };

  const [positions, setPositions] = useState<
    Record<string | number, [number, number]>
  >({});

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (dragItem === null) return;

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
    },
    [dragItem]
  );

  return (
    <>
      <Canvas ref={canvasRef} onMouseUp={handleUp} onMouseMove={handleMouse}>
        {items.map((el) => {
          const x = positions[el.id]?.[0] ?? el.defaultPosition?.[0] ?? 0;
          const y = positions[el.id]?.[1] ?? el.defaultPosition?.[1] ?? 0;
          return (
            <DragItem
              key={el.id}
              x={x}
              y={y}
              setDragItem={setDragItem}
              el={el}
            />
          );
        })}
      </Canvas>
    </>
  );
};

const DragItem = memo(
  ({
    el,
    x,
    y,
    setDragItem,
  }: {
    el: IItem;
    setDragItem: React.Dispatch<React.SetStateAction<IDragItem | null>>;
    x: number;
    y: number;
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
        {el.content}
      </div>
    );
  }
);

const Canvas = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
