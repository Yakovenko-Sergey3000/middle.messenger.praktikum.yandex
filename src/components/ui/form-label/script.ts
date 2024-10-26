import "./styles.css";
import template from "./template.hbs.js";
import Component, { IComponent } from "../../../utils/component.js";
import concatClasses from "../../../utils/concat-classes.js";
import { Any, ComponentType } from "../../../utils/global-types/index.js";

type UiFormType = ComponentType & {
  forId?: string;
  label: string;
  error?: string;
  element: IComponent;
};
class UiFormLabel extends Component {
  componentDidUpdate(oldState: Any, newState: Any): boolean {
    if (oldState.error !== newState.error) {
      return true;
    }

    return false;
  }

  componentDidReRender() {
    this.children.element.getContent().focus();
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: UiFormType) =>
  new UiFormLabel("div", {
    ...props,
    attributes: {
      ...props.attributes,
      class: concatClasses("form-label", props.className),
    },
  });
