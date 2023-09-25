import { xor } from "lodash";

const canvasEl = document.querySelector<HTMLElement>("#canvas");

export let elementsInView: Element[] = [];

const observer = new IntersectionObserver(
  (events) => {
    events.forEach((ev) => {
      elementsInView = xor(elementsInView, [ev.target]);
    });
  },
  {
    root: canvasEl,
    threshold: 0.5,
  }
);

export type GuildLinesProps = {
  element?: HTMLElement | null;
};

export const guidelines = ({ element }: GuildLinesProps) => {
  if (!element) return;

  observer.observe(element);
};
