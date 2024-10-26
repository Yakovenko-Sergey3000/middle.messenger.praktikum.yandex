import "./style.css";
import Component from "../../../utils/component.js";
import { Any, ComponentEventsType } from "../../../utils/global-types/index.js";
import concatClasses from "../../../utils/concat-classes.js";

type UiInputType = ComponentEventsType & {
  attributes?: Any;
  className?: string;
  variant?: "filled" | "flushed" | "un-styled";
};
class Script extends Component {
  render(): DocumentFragment {
    return this.compile("", this.props);
  }
}

export default (props: UiInputType = {}) => {
  concatClasses("12", "34", { a: "fill", b: "json" });
  return new Script("input", {
    ...props,
    attributes: {
      class: concatClasses(
        "input",
        { filled: "filled-input", flushed: "flushed-input", "un-styled": "un-styled-input" }[
          props.variant || "filled"
        ],
        props.className,
      ),
      ...props.attributes,
    },
  });
};
