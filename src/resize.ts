export type ResizeProps = {
  element?: HTMLElement | null;
  canvas?: HTMLElement | null;
};

export const sizes = new Map<Element, DOMRectReadOnly>();

const resizeObserver = new ResizeObserver((events) => {
  events.forEach((e) => {
    sizes.set(e.target, e.contentRect);
  });
});

export const resize = ({ canvas, element }: ResizeProps) => {
  if (!element || !canvas) return;

  sizes.set(element, element.getBoundingClientRect());

  resizeObserver.observe(element);

  const resizeHandleElement = document.createElement("div");
  resizeHandleElement.classList.add("resize-edge");
  element.querySelector(".drag-content")?.appendChild(resizeHandleElement);

  const handleDown = (e: MouseEvent) => {
    if (e.button !== 0) return;

    e.stopPropagation();

    const handleMove = (e: MouseEvent) => {
      const rect = sizes.get(element);
      if (!rect) return;
      element.style.width = Math.max(50, rect.width + e.movementX) + "px";
      element.style.height = Math.max(50, rect.height + e.movementY) + "px";
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  resizeHandleElement.addEventListener("mousedown", handleDown);
};
