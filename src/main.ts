import { canvas, drag } from "./common";
import { guidelines } from "./guidelines";
import { panel } from "./panel";
import { resize } from "./resize";
import { select } from "./select";

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

resize({
  element: document.querySelector<HTMLElement>("#drag1"),
  canvas: containerEl,
});
resize({
  element: document.querySelector<HTMLElement>("#drag2"),
  canvas: containerEl,
});
resize({
  element: document.querySelector<HTMLElement>("#drag3"),
  canvas: containerEl,
});
resize({
  element: document.querySelector<HTMLElement>("#drag4"),
  canvas: containerEl,
});

guidelines({
  element: document.querySelector<HTMLElement>("#drag1"),
});
guidelines({
  element: document.querySelector<HTMLElement>("#drag2"),
});
guidelines({
  element: document.querySelector<HTMLElement>("#drag3"),
});
guidelines({
  element: document.querySelector<HTMLElement>("#drag4"),
});

panel();
