import uuid from "uuid4";
import Handlebars from "handlebars";
import EventBus from "./event-bus.ts";

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

  setProps(newProps: unknown): void;

  getContent(): HTMLElement;

  render(): DocumentFragment;
  show(): void;
  hide(): void;
}

type ChildrenType = Record<string, IComponent>;
type ListChildrenType = Record<string, IComponent[]>;
type EventsType = Record<string, (e: unknown) => void>;
type AttributesType = Record<string, string>;
type PropsType = Record<string, unknown>;

export default class Component<Props extends Record<string, unknown> = Record<string, unknown>> {
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
    props: PropsType;
  };

  id: string;

  #eventBus: () => EventBus<Record<string, unknown>>;

  props: PropsType;

  children: ChildrenType;

  events: EventsType;

  listChildren: ListChildrenType;

  attributes: AttributesType;

  constructor(tagName: string = "div", propsAndChildren: Props = {} as Props) {
    const shiftedProps = this.#shiftProps(propsAndChildren);

    this.#meta = {
      tagName,
      props: shiftedProps.props,
    };

    this.props = this.#makeProxyProps<PropsType>(shiftedProps.props);
    this.children = this.#makeProxyProps<ChildrenType>(shiftedProps.children);
    this.listChildren = this.#makeProxyProps<ListChildrenType>(shiftedProps.listChildren);
    this.events = shiftedProps.events;
    this.attributes = shiftedProps.attributes;
    const eventBus = new EventBus<Record<string, unknown>>();

    this.id = uuid();
    this.#element = this.#createElement(tagName);
    this.#eventBus = () => eventBus;
    this.#registrationEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT);
  }

  #shiftProps(propsAndChildren: Props): {
    props: PropsType;
    children: ChildrenType;
    events: EventsType;
    listChildren: ListChildrenType;
    attributes: AttributesType;
  } {
    const props: PropsType = {};
    const children: ChildrenType = {};
    const events: EventsType = {};
    const listChildren: ListChildrenType = {};
    let attributes: AttributesType = {};

    Object.keys(propsAndChildren).forEach((key) => {
      if (this.#isChildComponent(propsAndChildren[key])) {
        children[key] = propsAndChildren[key];
      } else if (this.#isEventFunction(key, propsAndChildren[key])) {
        const eventKey = key.slice(2).toLowerCase();

        events[eventKey] = propsAndChildren[key] as () => void;
      } else if (Array.isArray(propsAndChildren[key])) {
        if (listChildren[key] === undefined) {
          listChildren[key] = [];
        }

        const list = propsAndChildren[key] as [];

        list.forEach((child: IComponent) => {
          listChildren[key].push(child);
        });
      } else if (key === "attributes") {
        attributes = { ...(propsAndChildren.attributes as AttributesType) };
      } else {
        props[key] = propsAndChildren[key];
      }
    });

    return { props, children, events, listChildren, attributes };
  }

  #isChildComponent(item: unknown) {
    return item instanceof Component;
  }

  #isEventFunction(key: string, item: unknown) {
    return key.startsWith("on") && typeof item === "function";
  }

  #makeProxyProps<T extends Record<string, unknown>>(props: T): T {
    return ((self) =>
      new Proxy(props, {
        set(target, key: string, newValue): boolean {
          const oldValue = { ...target };
          // eslint-disable-next-line no-param-reassign
          target[key as keyof T] = newValue;

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

  #registrationEvents(eventBus: EventBus<Record<string, unknown>>) {
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

  #componentDidUpdate(oldState: unknown, newState: unknown): void {
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

  componentDidUpdate(oldState: unknown, newState: unknown): boolean {
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

  compile(template: string, options: object = {}) {
    const propsAndStubs: Record<string, unknown> = { ...options };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this.listChildren).forEach(([key, child]) => {
      if (child.length && child[0] instanceof Component) {
        propsAndStubs[key] = `<div data-id=${child[0].id}></div>`;
      }
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
      if (child.length && child[0] instanceof Component) {
        const stub = fragment.content.querySelector(`[data-id="${child[0].id}"]`);

        if (!stub) {
          return;
        }

        const listFragment = document.createElement("template");

        child.forEach((item) => {
          listFragment.content.append(item.getContent());
        });

        stub.replaceWith(listFragment.content);
      }
    });

    return fragment.content;
  }

  setProps(newProps: Props): void {
    if (newProps === null && typeof newProps !== "object") {
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

  render() {
    return this.compile("");
  }

  hide(): void {
    this.#element.style.display = "none";
  }

  show(): void {
    this.#element.style.display = "block";
    this.#eventBus().emit(Component.EVENTS.CDU);
  }
}
