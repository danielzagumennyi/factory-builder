export const getRelativeMousePosition = (
  e: React.MouseEvent<HTMLElement>
): [number, number] => {
  const rect = e.currentTarget.getBoundingClientRect();
  return [e.clientX - rect.x, e.clientY - rect.y];
};

export const getElementPosition = (
  el: HTMLElement,
  canvas: HTMLElement
): [number, number] => {
  const rect = el.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();

  return [rect.x - canvasRect?.x, rect.y - canvasRect?.y];
};
