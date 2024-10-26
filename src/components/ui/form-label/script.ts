import "./styles.css";
import template from "./template.hbs.js";
import Component, { IComponent } from "../../../utils/component.js";
import concatClasses from "../../../utils/concat-classes.js";
import { ComponentType } from "../../../utils/global-types/index.js";

type UiFormType = ComponentType & {
  forId?: string;
  label: string;
  error?: string;
  element: IComponent;
};
class UiFormLabel extends Component {
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
