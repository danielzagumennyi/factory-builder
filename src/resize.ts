import { store } from "./store";

export type ResizeProps = {
  element?: HTMLElement | null;
  canvas?: HTMLElement | null;
};

type PlacementType = ["left" | "right", "top" | "bottom"];
const handlePositions: PlacementType[] = [
  ["left", "top"],
  ["right", "top"],
  ["right", "bottom"],
  ["left", "bottom"],
];
const getSign = (v: "left" | "right" | "top" | "bottom") =>
  ["left", "top"].includes(v) ? "-" : "";

export const resize = ({ canvas, element }: ResizeProps) => {
  if (!element || !canvas) return;

  const resizeHandles = handlePositions.map(([x, y]) => {
    const resizeHandle = document.createElement("span");
    resizeHandle.classList.add("resize-edge");
    resizeHandle.style[x] = "0px";
    resizeHandle.style[y] = "0px";
    resizeHandle.style.transform = `translate(${getSign(x)}50%, ${getSign(
      y
    )}50%)`;
    resizeHandle.setAttribute("data-placement", `${x}-${y}`);
    element.querySelector(".drag-content")?.appendChild(resizeHandle);

    return resizeHandle;
  });

  const handleDown = (e: MouseEvent) => {
    const placement = (e.target as HTMLSpanElement)
      .getAttribute("data-placement")
      ?.split("-") as PlacementType | undefined;
    if (e.button !== 0 || !placement) return;

    e.stopPropagation();

    const handleMove = (e: MouseEvent) => {
      const rect = store.elementsData.get(element)?.rect;
      if (!rect) return;

      if (placement[0] === "left") {
        element.style.width = `${Math.max(50, rect.width - e.movementX)}px`;
        element.style.left = `${Math.max(
          50,
          element.getBoundingClientRect().x + e.movementX
        )}px`;
      } else {
        element.style.width = `${Math.max(50, rect.width + e.movementX)}px`;
      }
      if (placement[1] === "top") {
        element.style.height = `${Math.max(50, rect.height - e.movementY)}px`;
        element.style.top = `${Math.max(
          50,
          element.getBoundingClientRect().y + e.movementY
        )}px`;
      } else {
        element.style.height = `${Math.max(50, rect.height + e.movementY)}px`;
      }
    };

    const handleUp = () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  resizeHandles.forEach((el) => el.addEventListener("mousedown", handleDown));
};
