export const getRelativeMousePosition = (
  element: Element,
  e: MouseEvent
): [number, number] => {
  const rect = element.getBoundingClientRect();
  return [e.clientX - rect.x, e.clientY - rect.y];
};

export const getElementPosition = (
  el: Element,
  canvas: Element
): [number, number] => {
  const rect = el.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();

  return [rect.x - canvasRect?.x, rect.y - canvasRect?.y];
};
