import { mean } from "lodash";
import { positions, setPosition } from "./common";
import { selectedElements } from "./select";

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
          const pos = positions.get(el);
          if (!pos) return;
          setPosition(el, [minX, pos[1]]);
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
          const pos = positions.get(el);
          if (!pos) return;
          setPosition(el, [
            averageX - el.getBoundingClientRect().width / 2,
            pos[1],
          ]);
        });
        return;
      }

      if (align === "right") {
        const maxX = Math.min(
          ...selectedElements.map((item) => item.getBoundingClientRect().x)
        );

        selectedElements.forEach((el) => {
          const pos = positions.get(el);
          if (!pos) return;
          setPosition(el, [maxX, pos[1]]);
        });
        return;
      }
    });
  });
};
