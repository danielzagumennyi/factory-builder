import { selectedElements, setSelected, unselect } from "./select";
import { getRelativeMousePosition } from "./utils/utils";

export type PositionType = [number, number];

export type DragProps = {
  element?: HTMLElement | null;
  canvas?: HTMLElement | null;
};

export type CanvasProps = {
  element?: HTMLElement | null;
  canvas?: HTMLElement | null;
};

export let scale = 1;

export const positions = new Map<HTMLElement, PositionType>();

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

export const setPosition = (
  element: HTMLElement,
  newPosition: PositionType
) => {
  positions.set(element, newPosition);
  element.style.left = newPosition[0] + "px";
  element.style.top = newPosition[1] + "px";
  positions.set(element, newPosition);
};

const handleMove = ({
  event,
  canvas,
}: {
  event: MouseEvent;
  canvas?: HTMLElement;
}) => {
  if (!canvas || !selectedElements.length) return;

  selectedElements.map((el) => {
    const currentPos = positions.get(el) || [0, 0];

    const position: [number, number] = [
      (currentPos[0] + event.movementX) / scale,
      (currentPos[1] + event.movementY) / scale,
    ];

    setPosition(el, position);
  });
};

export const drag = ({ element, canvas = document.body }: DragProps) => {
  if (!element || !canvas) return;

  const handleDown = (e: MouseEvent) => {
    if (e.button !== 0) return;

    e.stopPropagation();

    if (!selectedElements.includes(element)) {
      selectedElements.forEach(unselect);
      setSelected(element);
    }

    const move = (event: MouseEvent) => {
      handleMove({ event, canvas });
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", handleUp);
    };

    document.addEventListener("mousemove", move);
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

  element.addEventListener("resize", console.log);
};
