import { canvas, drag, select } from "./components/Drag";

const canvasEl = document.querySelector<HTMLElement>("#canvas");
const containerEl = document.querySelector<HTMLElement>("#container");

canvas({ element: containerEl, canvas: canvasEl });

select({ canvas: canvasEl });

// drag({
//   element: containerEl,
//   canvas: canvasEl,
// });
drag({
  element: document.querySelector<HTMLElement>("#drag1"),
  canvas: containerEl,
});
drag({
  element: document.querySelector<HTMLElement>("#drag2"),
  canvas: containerEl,
});
drag({
  element: document.querySelector<HTMLElement>("#drag3"),
  canvas: containerEl,
});
drag({
  element: document.querySelector<HTMLElement>("#drag4"),
  canvas: containerEl,
});
