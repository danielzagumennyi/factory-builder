import { PositionType } from "./common";

type ElementData = {
  position: PositionType;
  rect: DOMRect;
};

export const elementsData = new Map<HTMLElement, Partial<ElementData>>();

export const updateElementData = (
  el: HTMLElement,
  newData: Partial<ElementData>
) => {
  const currentData = elementsData.get(el);
  elementsData.set(el, currentData ? { ...currentData, ...newData } : newData);
};

export const setPosition = (
  element: HTMLElement,
  newPosition: PositionType
) => {
  updateElementData(element, { position: newPosition });
  element.style.left = newPosition[0] + "px";
  element.style.top = newPosition[1] + "px";
};
