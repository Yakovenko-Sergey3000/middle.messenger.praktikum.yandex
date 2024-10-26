import { IComponent } from "./component.js";

export const renderComponent = (selector: string, block: IComponent): void => {
  const element: HTMLElement | null = document.querySelector(selector);
  if (element) {
    element.appendChild(block.getContent());
    block.dispatchComponentDidMount();
  }
};