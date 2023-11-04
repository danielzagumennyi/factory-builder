import { mean } from "lodash";
import { setPosition } from "./store";
import { selectedElements } from "./select";
import { elementsData } from "./store";

export const panel = () => {
  document.querySelectorAll("[data-align]").forEach((el) => {
    el.addEventListener("click", (e) => {
      console.log(e);
      const align = (e.target as HTMLElement).getAttribute("data-align");
      if (align === "left") {
        const minX = Math.min(
          ...selectedElements.map((item) => item.getBoundingClientRect().x)
        );

        selectedElements.forEach((el) => {
          const position = elementsData.get(el)?.position;
          if (!position) return;
          setPosition(el, [minX, position[1]]);
        });
        return;
      }

      if (align === "horizontal-center") {
        const averageX = mean(
          selectedElements.map((el) => {
            const { x, width } = el.getBoundingClientRect();

            return x + width / 2;
          })
        );

        selectedElements.forEach((el) => {
          const position = elementsData.get(el)?.position;
          if (!position) return;
          setPosition(el, [
            averageX - el.getBoundingClientRect().width / 2,
            position[1],
          ]);
        });
        return;
      }

      if (align === "right") {
        const maxX = Math.min(
          ...selectedElements.map((item) => item.getBoundingClientRect().x)
        );

        selectedElements.forEach((el) => {
          const position = elementsData.get(el)?.position;
          if (!position) return;
          setPosition(el, [maxX, position[1]]);
        });
        return;
      }
    });
  });
};
