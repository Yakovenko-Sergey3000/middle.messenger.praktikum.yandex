import "./styles.css";
import template from "./template.hbs.ts";
import Component, { IComponent } from "../../../utils/component.ts";
import concatClasses from "../../../utils/concat-classes.ts";
import { ComponentType } from "../../../utils/global-types/index.ts";

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
