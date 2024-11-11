import { IComponent } from "../component.ts";
import Route from "./route.ts";
import { NotFound } from "./NotFound.ts";

class Router {
  static instance: Router;

  #routes: Route[];

  #history: History;

  #currentRoute: Route | null;

  #rootQuery: string;

  constructor() {
    this.#routes = [];
    this.#history = window.history;
    this.#currentRoute = null;
    this.#rootQuery = "#app";

    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }

    Router.instance = this;
  }

  use(pathname: string, component: IComponent): this {
    const route = new Route(pathname, component, { rootQuery: this.#rootQuery });
    this.#routes.push(route);

    return this;
  }

  start() {
    window.addEventListener("popstate", (event) => {
      const target = event.currentTarget as Window;
      this.#onRoute(target.location.pathname);
    });

    this.#onRoute(window.location.pathname);
  }

  #onRoute(pathname: string) {
    let route = this.#getRoute(pathname);

    if (!route) {
      route = new Route(
        pathname,
        NotFound(() => this.back()),
        { rootQuery: this.#rootQuery },
      );
    }

    if (this.#currentRoute) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.#history.pushState({}, "", pathname);
    this.#onRoute(pathname);
  }

  back() {
    this.#history.back();
  }

  #getRoute(pathname: string) {
    return this.#routes.find((route) => route.match(pathname));
  }
}

export default Router;
