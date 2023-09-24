import { uniq } from "lodash";
import { getElementPosition, getRelativeMousePosition } from "./utils/utils";
import { positions, setPosition } from "./common";

export let selectedElements: HTMLElement[] = [];

export const setSelected = (el: HTMLElement) => {
  selectedElements = uniq([...selectedElements, el]);
  showActive(el);
};

export const unselect = (el: HTMLElement) => {
  selectedElements = selectedElements.filter((item) => item !== el);
  unShowActive(el);
};

export const showActive = (el: HTMLElement) => {
  el.style.boxShadow = "0 0 0 2px #4597F7";
};

export const unShowActive = (el: HTMLElement) => {
  el.style.boxShadow = "none";
};

type SelectProps = {
  canvas?: HTMLElement | null;
};

export const select = ({ canvas }: SelectProps) => {
  if (!canvas) return;

  const handleDown = (e: MouseEvent) => {
    selectedElements.forEach(unselect);

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
            setSelected(el);
          } else {
            unselect(el);
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
