import { describe, test, beforeAll, expect } from "@jest/globals";
import Component, { IComponent } from "./component.ts";
import { renderComponent } from "./rende-component.ts";

describe("Component", () => {
  let intiComponent: IComponent;

  beforeAll(() => {
    const body = document.querySelector("body");

    if (body) {
      body.innerHTML = "<div id='root'></div>";
    }

    class MyComponent extends Component {
      constructor() {
        super("div", { attributes: { class: "test" }, text: "Hello World" });
      }

      render(): DocumentFragment {
        return this.compile("{{{ text }}}", this.props);
      }
    }

    intiComponent = new MyComponent();
  });

  test("Компонент должен отображаться на странице", () => {
    renderComponent("#root", intiComponent);
    intiComponent.dispatchComponentDidMount();
    const comp = document.body.querySelector(".test");

    expect(comp?.textContent).toBe("Hello World");
  });

  test("Должен изменить текс через setProps()", () => {
    renderComponent("#root", intiComponent);
    intiComponent.dispatchComponentDidMount();
    intiComponent.setProps({ text: "Hello Test" });

    const comp = document.body.querySelector(".test");

    expect(comp?.textContent).toBe("Hello Test");
  });
});
