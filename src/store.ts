import { PositionType } from "./common";

type ElementData = {
  position: PositionType;
  rect: DOMRect;
  isVisible: boolean;
  isSelected: boolean;
};

export const store = {
  canvasElement: document.body,
  containerElement: document.body,
  scale: 1,

  elementsData: new Map<HTMLElement, Partial<ElementData>>(),
  get arrayData() {
    return [...this.elementsData.entries()];
  },

  get selectedElements() {
    return [...this.elementsData.entries()]
      .filter((el) => el[1].isSelected)
      .map((el) => el[0]);
  },

  get notSelectedElements() {
    return [...this.elementsData.entries()]
      .filter((el) => !el[1].isSelected)
      .map((el) => el[0]);
  },

  addElement(el: HTMLElement) {
    this.elementsData.set(el, {});
    observeElement(el);
  },
  removeElement(el: HTMLElement) {
    this.elementsData.delete(el);
  },
  updateElementData(el: HTMLElement, newData: Partial<ElementData>) {
    const currentData = this.elementsData.get(el);
    this.elementsData.set(
      el,
      currentData ? { ...currentData, ...newData } : newData
    );
  },
};

export const setPosition = (
  element: HTMLElement,
  newPosition: PositionType
) => {
  store.updateElementData(element, { position: newPosition });
  element.style.left = newPosition[0] + "px";
  element.style.top = newPosition[1] + "px";
};

const resizeObserver = new ResizeObserver((events) => {
  events.forEach((e) => {
    store.updateElementData(e.target as HTMLElement, { rect: e.contentRect });
  });
});

export const elementsInView: Element[] = [];

const intersectionObserver = new IntersectionObserver(
  (events) => {
    events.forEach((ev) => {
      store.updateElementData(ev.target as HTMLElement, {
        isVisible: ev.isIntersecting,
      });
    });
  },
  {
    root: store.canvasElement,
    threshold: 0.5,
  }
);

export const observeElement = (el: HTMLElement) => {
  resizeObserver.observe(el);
  intersectionObserver.observe(el);
};

window.store = store;
