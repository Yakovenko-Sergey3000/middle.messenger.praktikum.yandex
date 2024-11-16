import { IComponent } from "../component.ts";
import Route from "./route.ts";

class Router {
  static instance: Router;

  #routes: Route[];

  #history: History;

  #currentRoute: Route | null;

  #rootQuery: string;

  #notFound: (() => void) | IComponent | null;

  constructor() {
    this.#routes = [];
    this.#history = window.history;
    this.#currentRoute = null;
    this.#rootQuery = "#app";
    this.#notFound = null;

    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }

    Router.instance = this;
  }

  use(
    pathname: string,
    component: IComponent,
    { middleware }: { middleware?: ((props?: Route) => void)[]; [key: string]: unknown } = {},
  ): this {
    const route = new Route(pathname, component, { rootQuery: this.#rootQuery, middleware });
    this.#routes.push(route);

    return this;
  }

  notFound(params: IComponent | (() => void)) {
    this.#notFound = params;
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
      if (this.#notFound === null) {
        return;
      }

      if (typeof this.#notFound === "function") {
        this.#notFound();
      }

      if (typeof this.#notFound === "object") {
        route = new Route(pathname, this.#notFound, { rootQuery: this.#rootQuery });
      } else {
        return;
      }
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
