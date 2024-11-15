import { IComponent } from "../component.ts";
import { renderComponent } from "../rende-component.ts";

class Route {
  component: IComponent | null;

  constructor(
    private pathname: string,
    private block: IComponent,
    private props: {
      rootQuery: string;
      [ket: string]: unknown;
    },
  ) {
    this.component = null;
  }

  match(pathname: string) {
    const urlPath = pathname.split("/");
    const componentPath = this.pathname.split("/");
    let isTrue = true;

    componentPath.forEach((key, idx) => {
      if (key !== urlPath[idx] && !key.startsWith(":")) {
        isTrue = false;
      }
    });

    return isTrue;
  }

  leave() {
    if (this.component) {
      this.component.hide();
    }
  }

  render() {
    if (!this.component) {
      this.component = this.block;
      renderComponent(this.props.rootQuery, this.component);

      return;
    }

    this.component.show();
  }
}

export default Route;