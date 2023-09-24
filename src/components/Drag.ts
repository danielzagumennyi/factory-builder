import { getElementPosition, getRelativeMousePosition } from "../utils/utils";

export type PositionType = [number, number];

type DragProps = {
  element?: HTMLElement | null;
  canvas?: HTMLElement | null;
};

type CanvasProps = {
  element?: HTMLElement | null;
  canvas?: HTMLElement | null;
};

let scale = 1;

const positions = new Map<HTMLElement, PositionType>();

export const canvas = ({ element, canvas }: CanvasProps) => {
  if (!element || !canvas) return;

  const onWheel = (e: WheelEvent) => {
    const position = positions.get(element);
    if (!position) return;

    const newScale = scale + e.deltaY / 1000;

    const prevMousePos = getRelativeMousePosition(element, e).map(
      (e) => e / scale
    );

    const newMousePos = getRelativeMousePosition(element, e).map(
      (e) => e / newScale
    );

    const diff = [
      prevMousePos[0] - newMousePos[0],
      prevMousePos[1] - newMousePos[1],
    ];

    scale = newScale;

    setPosition(element, [position[0] - diff[0], position[1] - diff[1]]);
    element.style.transform = `scale(${scale})`;
  };

  canvas.addEventListener("wheel", onWheel);
};

const setPosition = (element: HTMLElement, newPosition: PositionType) => {
  positions.set(element, newPosition);
  element.style.left = newPosition[0] + "px";
  element.style.top = newPosition[1] + "px";
  positions.set(element, newPosition);
};

export const drag = ({ element, canvas = document.body }: DragProps) => {
  if (!element || !canvas) return;

  const handleDown = (e: MouseEvent) => {
    if (e.button !== 0) return;

    e.stopPropagation();

    const offset = getRelativeMousePosition(element, e);

    const handleMove = (e: MouseEvent) => {
      const mouseCoords = getRelativeMousePosition(canvas, e);

      const position: [number, number] = [
        (mouseCoords[0] - offset[0]) / scale,
        (mouseCoords[1] - offset[1]) / scale,
      ];

      setPosition(element, position);
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  const onKeyUp = (e: KeyboardEvent) => {
    const step = 10;

    const position = positions.get(element);
    if (!position) return;

    const [x, y] = position;

    if (e.key === "ArrowUp") setPosition(element, [x, y - step]);
    if (e.key === "ArrowRight") setPosition(element, [x + step, y]);
    if (e.key === "ArrowDown") setPosition(element, [x, y + step]);
    if (e.key === "ArrowLeft") setPosition(element, [x - step, y]);
  };

  element.addEventListener("mousedown", handleDown);
  element.addEventListener("keyup", onKeyUp);

  element.style.position = "absolute";
  element.setAttribute("tabindex", "0");
};

type SelectProps = {
  canvas?: HTMLElement | null;
};

export const select = ({ canvas }: SelectProps) => {
  if (!canvas) return;

  const handleDown = (e: MouseEvent) => {
    const selectionEl = document.createElement("div");
    selectionEl.setAttribute("id", "selection");
    selectionEl.style.position = "absolute";

    const start = getRelativeMousePosition(canvas, e);
    const [startX, startY] = start;

    setPosition(selectionEl, start);

    canvas.appendChild(selectionEl);

    const handleMove = (e: MouseEvent): void => {
      const [mouseX, mouseY] = getRelativeMousePosition(canvas, e);

      const [width, height] = [mouseX - startX, mouseY - startY];

      selectionEl.style.transform = `${
        width < 0 ? "translateX(-100%)" : "translateX(0)"
      } ${height < 0 ? "translateY(-100%)" : "translateY(0)"}`;

      selectionEl.style.width = Math.abs(width) + "px";
      selectionEl.style.height = Math.abs(height) + "px";

      const rect = selectionEl.getBoundingClientRect();

      const [selectionX, selectionY] = getElementPosition(selectionEl, canvas);

      for (const [el, [x, y]] of positions.entries()) {
        if (el.hasAttribute("data-type")) {
          if (
            x > selectionX &&
            x < selectionX + rect.width &&
            y > selectionY &&
            y < selectionY + rect.height
          ) {
            showActive(el);
          } else {
            unShowActive(el);
          }
        }
      }
    };
    canvas.addEventListener("mousemove", handleMove);

    canvas.addEventListener("mouseup", () => {
      canvas.removeEventListener("mousemove", handleMove);
      selectionEl.remove();
    });
  };

  canvas.addEventListener("mousedown", handleDown);
};

const showActive = (el: HTMLElement) => {
  el.style.border = "1px solid blue";
};
const unShowActive = (el: HTMLElement) => {
  el.style.border = "none";
};
