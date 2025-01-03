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
    const dynamicRouteRegex = new RegExp(`^${this.pathname.replace(/\/:[^/]+/, "/[^/]+")}$`);
    return dynamicRouteRegex.test(pathname);
  }

  leave() {
    if (this.component) {
      this.component.hide();
    }
  }

  getPath() {
    return this.pathname;
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
