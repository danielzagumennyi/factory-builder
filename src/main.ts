import { canvas, drag } from "./common";
import { panel } from "./panel";
import { resize } from "./resize";
import { select } from "./select";
import { store } from "./store";

store.containerElement = store.containerElement =
  document.querySelector<HTMLElement>("#container") || document.body;
store.canvasElement =
  document.querySelector<HTMLElement>("#canvas") || document.body;

canvas();

select();

drag({ element: document.querySelector<HTMLElement>("#drag1") });
drag({ element: document.querySelector<HTMLElement>("#drag2") });
drag({
  element: document.querySelector<HTMLElement>("#drag3"),
  moveInnerPanel: true,
});
drag({ element: document.querySelector<HTMLElement>("#drag4") });

resize({ element: document.querySelector<HTMLElement>("#drag1") });
resize({ element: document.querySelector<HTMLElement>("#drag2") });
resize({ element: document.querySelector<HTMLElement>("#drag3") });
resize({ element: document.querySelector<HTMLElement>("#drag4") });

panel();
