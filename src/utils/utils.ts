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

export const hasCollision = (element1: HTMLElement, element2: HTMLElement) => {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};
export const createKeyWatcher = (key: string) => {
  let isKeyPressed = false;

  window.addEventListener("keydown", (event) => {
    if (event.code === key) {
      isKeyPressed = true;
    }
  });
  window.addEventListener("keyup", (event) => {
    if (event.code === key) {
      isKeyPressed = false;
    }
  });

  return function () {
    return isKeyPressed;
  };
};
