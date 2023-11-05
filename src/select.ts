import { setPosition, store } from "./store";
import { getElementPosition, getRelativeMousePosition } from "./utils/utils";

export const setSelected = (el: HTMLElement) => {
  store.updateElementData(el, { isSelected: true });
  showActive(el);
};

export const unselect = (el: HTMLElement) => {
  store.updateElementData(el, { isSelected: false });
  unShowActive(el);
};

export const showActive = (el: HTMLElement) => {
  el.style.boxShadow = "0 0 0 2px #4597F7";
};

export const unShowActive = (el: HTMLElement) => {
  el.style.boxShadow = "none";
};

export const select = () => {
  const handleDown = (e: MouseEvent) => {
    store.selectedElements.forEach(unselect);

    const selectionEl = document.createElement("div");
    selectionEl.setAttribute("id", "selection");
    selectionEl.style.position = "absolute";

    const start = getRelativeMousePosition(store.canvasElement, e);
    const [startX, startY] = start;

    setPosition(selectionEl, start);

    store.canvasElement.appendChild(selectionEl);

    const handleMove = (e: MouseEvent): void => {
      const [mouseX, mouseY] = getRelativeMousePosition(store.canvasElement, e);

      const [width, height] = [mouseX - startX, mouseY - startY];

      selectionEl.style.transform = `${
        width < 0 ? "translateX(-100%)" : "translateX(0)"
      } ${height < 0 ? "translateY(-100%)" : "translateY(0)"}`;

      selectionEl.style.width = Math.abs(width) + "px";
      selectionEl.style.height = Math.abs(height) + "px";

      const rect = selectionEl.getBoundingClientRect();

      const [selectionX, selectionY] = getElementPosition(
        selectionEl,
        store.canvasElement
      );

      for (const [el, data] of store.elementsData.entries()) {
        if (!data.position) return;

        const [x, y] = data.position;

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
    store.canvasElement.addEventListener("mousemove", handleMove);

    store.canvasElement.addEventListener("mouseup", () => {
      store.canvasElement.removeEventListener("mousemove", handleMove);
      selectionEl.remove();
    });
  };

  store.canvasElement.addEventListener("mousedown", handleDown);
};
