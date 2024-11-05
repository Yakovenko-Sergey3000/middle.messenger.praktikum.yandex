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

  #eventBus: () => EventBus<IComponent>;

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

    this.props = this.#makeProxyProps(shiftedProps.props);
    this.children = this.#makeProxyProps(shiftedProps.children);
    this.listChildren = this.#makeProxyProps(shiftedProps.listChildren);
    this.events = shiftedProps.events;
    this.attributes = shiftedProps.attributes;
    const eventBus = new EventBus<IComponent>();

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
      } else if (this.#isChildrenList(propsAndChildren[key])) {
        const list = propsAndChildren[key] as [];

        list.forEach((child: IComponent) => {
          if (listChildren[key] === undefined) {
            listChildren[key] = [];
          }

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

  #isChildrenList(item: unknown) {
    return Array.isArray(item) && !!item.filter((element) => element instanceof Component).length;
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
