import { clamp } from "lodash";
import { setSelected, unselect } from "./select";
import { store, setPosition } from "./store";
import { createKeyWatcher, hasCollision } from "./utils/utils";

export type PositionType = [number, number];

export type DragProps = {
  element?: HTMLElement | null;
  moveInnerPanel?: boolean;
};

export type CanvasProps = {
  element?: HTMLElement | null;
};

const spacePressed = createKeyWatcher("Space");

export const canvas = () => {
  // const onWheel = (e: WheelEvent) => {
  //   const position = store.elementsData.get(store.containerElement)?.position;
  //   if (!position) return;

  //   const newScale = scale + e.deltaY / 1000;

  //   const prevMousePos = getRelativeMousePosition(
  //     store.containerElement,
  //     e
  //   ).map((e) => e / scale);

  //   const newMousePos = getRelativeMousePosition(store.containerElement, e).map(
  //     (e) => e / newScale
  //   );

  //   const diff = [
  //     prevMousePos[0] - newMousePos[0],
  //     prevMousePos[1] - newMousePos[1],
  //   ];

  //   scale = newScale;

  //   setPosition(store.containerElement, [
  //     position[0] - diff[0],
  //     position[1] - diff[1],
  //   ]);
  //   store.containerElement.style.transform = `scale(${scale})`;
  // };

  // store.canvasElement.addEventListener("wheel", onWheel);

  const element = store.containerElement;

  store.canvasElement.addEventListener("wheel", function (event) {
    const rect = element.getBoundingClientRect();

    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    const scaledCursorX = cursorX / store.scale;
    const scaledCursorY = cursorY / store.scale;

    store.scale += event.deltaY * -0.001;

    store.scale = clamp(store.scale, 0.5, 3);

    element.style.transformOrigin =
      scaledCursorX + "px " + scaledCursorY + "px";

    element.style.transform = "scale(" + store.scale + ")";

    event.preventDefault();
  });

  store.canvasElement.addEventListener("wheel", function (event) {
    const rect = element.getBoundingClientRect();

    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    const scaledCursorX = cursorX / store.scale;
    const scaledCursorY = cursorY / store.scale;

    store.scale += event.deltaY * -0.001;

    store.scale = clamp(store.scale, 0.5, 3);

    element.style.transformOrigin =
      scaledCursorX + "px " + scaledCursorY + "px";

    element.style.transform = "scale(" + store.scale + ")";

    event.preventDefault();
  });
};

const handleMove = ({ event }: { event: MouseEvent }) => {
  const moveEl = (el: HTMLElement): void => {
    const currentPosition = store.elementsData.get(el)?.position || [0, 0];

    const newPosition: [number, number] = [
      currentPosition[0] + event.movementX / store.scale,
      currentPosition[1] + event.movementY / store.scale,
    ];

    setPosition(el, newPosition);
  };

  if (spacePressed()) {
    moveEl(store.containerElement);
    return;
  }

  if (!store.selectedElements.length) return;

  store.selectedElements.map(moveEl);
};

document.addEventListener("mousemove", (event: MouseEvent) => {
  handleMove({ event });
});

export const drag = ({ element, moveInnerPanel }: DragProps) => {
  if (!element) return;

  if (moveInnerPanel) {
    element.setAttribute("data-group", "true");
  }

  const handleDown = (e: MouseEvent) => {
    if (e.button !== 0) return;

    e.stopPropagation();

    if (!store.selectedElements.includes(element)) {
      store.selectedElements.forEach(unselect);
      setSelected(element);
    }

    store.selectedElements.forEach((el) => {
      if (!el.hasAttribute("data-group")) return;
      const collisionElements = store.notSelectedElements.filter((el2) =>
        hasCollision(el, el2)
      );

      collisionElements.forEach(setSelected);
    });

    const handleUp = () => {
      unselect(element);
      document.removeEventListener("mouseup", handleUp);
    };

    document.addEventListener("mouseup", handleUp);
  };

  const onKeyUp = (e: KeyboardEvent) => {
    const step = 10;

    const position = store.elementsData.get(element)?.position;
    if (!position) return;

    const [x, y] = position;

    if (e.key === "ArrowUp") setPosition(element, [x, y - step]);
    if (e.key === "ArrowRight") setPosition(element, [x + step, y]);
    if (e.key === "ArrowDown") setPosition(element, [x, y + step]);
    if (e.key === "ArrowLeft") setPosition(element, [x - step, y]);
  };

  element.addEventListener("mousedown", handleDown);
  element.addEventListener("keyup", onKeyUp);
};
