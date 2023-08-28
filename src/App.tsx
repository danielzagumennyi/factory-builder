import styled from "styled-components";
import { GlobalStyles, ResetStyles } from "./components/styled/Common";
import { useEffect, useRef, useState } from "react";

function App() {
  const [scale, setScale] = useState(1);

  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  const [drag, setDrag] = useState<number | string | null>(null);
  const [move, setMove] = useState(false);
  const [initCoords, setInitCoords] = useState([0, 0]);
  const [canvasCoords, setCanvasCoords] = useState([0, 0]);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      setDrag(null);
      setMove(false);
    };

    window.document.addEventListener("mouseup", handler);

    return () => {
      window.document.removeEventListener("mouseup", handler);
    };
  }, [drag]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).closest("[data-draggable-item]")) {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      setInitCoords([rect.left - e.clientX, rect.top - e.clientY]);
      setDrag((e.target as HTMLDivElement).getAttribute("data-id"));
    } else {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      setInitCoords([rect.left - e.clientX, rect.top - e.clientY]);
      setMove(true);
    }
  };

  const onMouseUp = () => {
    setDrag(null);
    setMove(false);
  };

  const [positions, setPositions] = useState<
    Record<string | number, [number, number]>
  >({
    0: [0, 0],
    1: [0, 0],
  });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    // setMousePosition([
    //   e.clientX - rect.left / scale,
    //   e.clientY - rect.top / scale,
    // ]);

    if (drag !== null) {
      const canvasCoords = canvasRef.current?.getBoundingClientRect();

      setPositions((p) => {
        const coords: [number, number] = [
          (e.clientX - (canvasCoords?.left || 0) + initCoords[0]) / scale,
          (e.clientY - (canvasCoords?.top || 0) + initCoords[1]) / scale,
        ];

        return {
          ...p,
          [drag]: coords,
        };
      });
    } else if (move) {
      const canvasCoords = canvasRef.current?.getBoundingClientRect();

      setCanvasCoords([
        (e.clientX - (canvasCoords?.left || 0) + initCoords[0]) / scale,
        (e.clientY - (canvasCoords?.top || 0) + initCoords[1]) / scale,
      ]);
    }
    console.log("🚀 ~ file: App.tsx:75 ~ handleMouse ~ move:", move);
  };

  return (
    <Wrapper>
      <ResetStyles />
      <GlobalStyles />

      <ResetZoom onClick={() => setScale(1)}>Reset Zoom</ResetZoom>

      <Canvas
        ref={canvasRef}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={handleMouse}
        onWheel={(e) => setScale((prev) => prev + e.deltaY / 1000)}
      >
        <Zoom
          data-zoom-item="true"
          $scale={scale}
          $x={canvasCoords[0]}
          $y={canvasCoords[1]}
        >
          <div data-draggable-item="true">
            <Card data-id="0" $x={positions["0"][0]} $y={positions["0"][1]} />
            <Card data-id="1" $x={positions["1"][0]} $y={positions["1"][1]} />
          </div>
        </Zoom>
      </Canvas>
    </Wrapper>
  );
}

const ResetZoom = styled.button`
  padding: 4px;
`;

const Zoom = styled.div<{ $scale: number; $x: number; $y: number }>`
  transform: scale(${(p) => p.$scale});
  transform-origin: 0px 0px;
  position: absolute;
  left: ${(p) => p.$x || 0}px;
  top: ${(p) => p.$y || 0}px;
`;

const Wrapper = styled.div`
  padding: 30px;
  width: 100%;
`;

const Card = styled.div<{ $x?: number; $y?: number }>`
  background-color: #515151;
  padding: 10px;
  width: 100px;
  height: 150px;
  position: absolute;
  left: ${(p) => p.$x || 0}px;
  top: ${(p) => p.$y || 0}px;
`;

const Canvas = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  border: 1px solid grey;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNjA4XzM2ODYpIj4KPGxpbmUgeDE9IjkwLjUiIHkxPSIyLjE4NTU3ZS0wOCIgeDI9IjkwLjUiIHkyPSIxMDAiIHN0cm9rZT0iIzM5MzkzOSIvPgo8bGluZSB4MT0iODAuNSIgeTE9IjIuMTg1NTdlLTA4IiB4Mj0iODAuNSIgeTI9IjEwMCIgc3Ryb2tlPSIjMzkzOTM5Ii8+CjxsaW5lIHgxPSI3MC41IiB5MT0iMi4xODU1N2UtMDgiIHgyPSI3MC41IiB5Mj0iMTAwIiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjYwLjUiIHkxPSIyLjE4NTU3ZS0wOCIgeDI9IjYwLjUiIHkyPSIxMDAiIHN0cm9rZT0iIzM5MzkzOSIvPgo8bGluZSB4MT0iMjAuNSIgeTE9IjIuMTg1NTdlLTA4IiB4Mj0iMjAuNSIgeTI9IjEwMCIgc3Ryb2tlPSIjMzkzOTM5Ii8+CjxsaW5lIHgxPSIxMC41IiB5MT0iMi4xODU1N2UtMDgiIHgyPSIxMC41IiB5Mj0iMTAwIiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjUwLjUiIHkxPSIyLjE4NTU3ZS0wOCIgeDI9IjUwLjUiIHkyPSIxMDAiIHN0cm9rZT0iIzM5MzkzOSIvPgo8bGluZSB4MT0iNDAuNSIgeTE9IjIuMTg1NTdlLTA4IiB4Mj0iNDAuNSIgeTI9IjEwMCIgc3Ryb2tlPSIjMzkzOTM5Ii8+CjxsaW5lIHgxPSIzMC41IiB5MT0iMi4xODU1N2UtMDgiIHgyPSIzMC41IiB5Mj0iMTAwIiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjkwLjUiIHgyPSItNC4zNzExNGUtMDgiIHkyPSI5MC41IiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjgwLjUiIHgyPSItNC4zNzExNGUtMDgiIHkyPSI4MC41IiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjcwLjUiIHgyPSItNC4zNzExNGUtMDgiIHkyPSI3MC41IiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjYwLjUiIHgyPSItNC4zNzExNGUtMDgiIHkyPSI2MC41IiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjIwLjUiIHgyPSItNC4zNzExNGUtMDgiIHkyPSIyMC41IiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjEwLjUiIHgyPSItNC4zNzExNGUtMDgiIHkyPSIxMC41IiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjUwLjUiIHgyPSItNC4zNzExNGUtMDgiIHkyPSI1MC41IiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjQwLjUiIHgyPSItNC4zNzExNGUtMDgiIHkyPSI0MC41IiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjMwLjUiIHgyPSItNC4zNzExNGUtMDgiIHkyPSIzMC41IiBzdHJva2U9IiMzOTM5MzkiLz4KPGxpbmUgeDE9IjAuNSIgeTE9IjIuMTg1NTdlLTA4IiB4Mj0iMC40OTk5OTYiIHkyPSIxMDAiIHN0cm9rZT0iIzgwODA4MCIvPgo8bGluZSB4MT0iMTAwIiB5MT0iMC41IiB4Mj0iLTQuMzcxMTRlLTA4IiB5Mj0iMC40OTk5OTEiIHN0cm9rZT0iIzgwODA4MCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE2MDhfMzY4NiI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=");
  display: flex;
  align-items: stretch;
`;

export default App;
