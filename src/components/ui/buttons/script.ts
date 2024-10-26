import "./styles.css";
import Component from "../../../utils/component.js";
import { ComponentEventsType, ComponentType } from "../../../utils/global-types/index.js";
import ConcatClasses from "../../../utils/concat-classes.js";

type UiButtonType = ComponentType &
  ComponentEventsType & {
    label: string;
    className?: string;
    variant?: "main" | "link" | "circle";
  };
class UiButton extends Component {
  render(): DocumentFragment {
    const { label = "" } = this.props;
    return this.compile(`${label}`, this.props);
  }
}

export default (props: UiButtonType) =>
  new UiButton("button", {
    ...props,
    attributes: {
      ...props.attributes,
      class: ConcatClasses(
        { main: "button", link: "button-link", circle: "button-circle" }[props.variant || "main"],
        props.className,
      ),
    },
  });
