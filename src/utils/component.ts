import uuid from "uuid4";
import Handlebars from "handlebars";
import EventBus from "./event-bus.ts";
import { Any } from "./global-types/index.ts";

export interface IComponent {
  id: string;
  props: Record<string, unknown>;
  children: Record<string, IComponent>;
  events: Record<string, (e: Event) => void>;
  listChildren: Record<string, IComponent[]>;
  attributes: Record<string, string>;

  componentDidMount(): void;

  componentDidReRender(): void;

  componentDidUpdate(oldState: IComponent, newState: IComponent): boolean;

  dispatchComponentDidMount(): void;

  init(): void;

  compile(template: string, options: IComponent): DocumentFragment;

  setProps(newProps: Any): void;

  getContent(): HTMLElement;

  render(): DocumentFragment;
}

export default class Component implements IComponent {
  static EVENTS = {
    INIT: "init",
    CDM: "component-did-mount",
    CDU: "component-did-update",
    CDR_R: "component-did-rerender",
    RENDER: "render",
  };

  #element: HTMLElement;

  #meta: {
    tagName: string;
    props: Record<string, IComponent>;
  };

  id: string;

  #eventBus: () => EventBus<IComponent>;

  props: Record<string, IComponent>;

  children: Record<string, IComponent>;

  events: Record<string, (e: Any) => void>;

  listChildren: Record<string, IComponent[]>;

  attributes: Record<string, string>;

  constructor(
    tagName: string = "div",
    propsAndChildren: { attributes?: Record<string, string> } & Any,
  ) {
    const { props, children, events, listChildren } = this.#shiftProps(propsAndChildren);

    this.#meta = {
      tagName,
      props,
    };

    this.props = this.#makeProxyProps(props);
    this.children = this.#makeProxyProps(children);
    this.events = events;
    this.listChildren = this.#makeProxyProps(listChildren);
    this.attributes = propsAndChildren.attributes || {};
    const eventBus = new EventBus<IComponent>();

    this.id = uuid();
    this.#element = this.#createElement(tagName);
    this.#eventBus = () => eventBus;
    this.#registrationEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT);
  }

  #shiftProps(propsAndChildren: Any): {
    props: Record<string, IComponent>;
    children: Record<string, IComponent>;
    events: Record<string, (e: Any) => void>;
    listChildren: Record<string, IComponent[]>;
  } {
    const props: Record<string, IComponent> = {};
    const children: Record<string, IComponent> = {};
    const events: Record<string, (e: Any) => void> = {};
    const listChildren: Record<string, IComponent[]> = {};

    Object.keys(propsAndChildren).forEach((key) => {
      if (propsAndChildren[key] instanceof Component) {
        children[key] = propsAndChildren[key] as IComponent;
      } else if (key.startsWith("on")) {
        events[key.slice(2).toLowerCase()] = propsAndChildren[key];
      } else if (Array.isArray(propsAndChildren[key])) {
        propsAndChildren[key].forEach((child: IComponent) => {
          if (!listChildren[key]) {
            listChildren[key] = [];
          }
          if (child instanceof Component) {
            listChildren[key].push(child);
          }
        });
      } else {
        props[key] = propsAndChildren[key];
      }
    });

    return { props, children, events, listChildren };
  }

  #makeProxyProps(props: Any) {
    return ((self) =>
      new Proxy(props, {
        set(target, key: string, newValue): boolean {
          const oldValue = { ...target };
          // eslint-disable-next-line no-param-reassign
          target[key] = newValue;

          self.#eventBus().emit(Component.EVENTS.CDU, oldValue, target);
          return true;
        },
        defineProperty(_, property: string): boolean {
          if (property.startsWith("#")) {
            throw new Error(`Нельзя удалить это свойство: ${property}`);
          }

          return true;
        },
      }))(this);
  }

  #registrationEvents(eventBus: EventBus<IComponent>) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.CDM, this.#componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.CDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.CDR_R, this.#componentDidReRender.bind(this));
    eventBus.on(Component.EVENTS.RENDER, this.#render.bind(this));
  }

  #createElement(tageName: string) {
    return document.createElement(tageName);
  }

  #componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child: IComponent) => {
      child.dispatchComponentDidMount();
    });

    Object.values(this.listChildren).forEach((child) => {
      child.forEach((item) => item.dispatchComponentDidMount());
    });
  }

  #componentDidUpdate(oldState: Any, newState: Any): void {
    if (!this.componentDidUpdate(oldState, newState)) {
      return;
    }

    this.#render();
    this.#eventBus().emit(Component.EVENTS.CDR_R);
  }

  #componentDidReRender() {
    this.componentDidReRender();
  }

  #setEvents(): void {
    Object.keys(this.events).forEach((eventKey: string) => {
      this.#element.addEventListener(eventKey, this.events[eventKey]);
    });
  }

  #removeEvents(): void {
    Object.keys(this.events).forEach((eventKey: string) => {
      this.#element.removeEventListener(eventKey, this.events[eventKey]);
    });
  }

  #setAttributes() {
    this.#element.setAttribute("data-id", this.id);
    Object.entries(this.attributes).forEach(([key, val]) => {
      this.#element.setAttribute(key, val);
    });
  }

  #render() {
    const block: DocumentFragment = this.render();
    this.#removeEvents();
    this.#element.innerHTML = "";
    this.#element.appendChild(block);
    this.#setAttributes();
    this.#setEvents();
  }

  componentDidMount(): void {}

  componentDidReRender(): void {}

  componentDidUpdate(oldState: Any, newState: Any): boolean {
    if (oldState && newState) {
      return true;
    }

    return true;
  }

  dispatchComponentDidMount(): void {
    this.#eventBus().emit(Component.EVENTS.CDM);
  }

  getContent() {
    return this.#element;
  }

  init(): void {
    this.#element = this.#createElement(this.#meta.tagName);
    this.#eventBus().emit(Component.EVENTS.RENDER);
  }

  compile(template: string, options: Any = {}): DocumentFragment {
    const propsAndStubs = { ...options };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this.listChildren).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id=${child[0].id}></div>`;
    });

    const fragment = document.createElement("template");

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent());
    });

    Object.values(this.listChildren).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child[0].id}"]`);

      if (!stub) {
        return;
      }

      const listFragment = document.createElement("template");

      child.forEach((item) => {
        listFragment.content.append(item.getContent());
      });

      stub.replaceWith(listFragment.content);
    });

    return fragment.content;
  }

  setProps(newProps: Any): void {
    if (!newProps) {
      return;
    }

    const { props, children, listChildren } = this.#shiftProps(newProps);

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(listChildren).length) {
      Object.assign(this.listChildren, listChildren);
    }
  }

  render(): DocumentFragment {
    return this.compile("");
  }
}
