import "./styles.css";
import avatar from "./template.hbs.js";
import Component from "../../../utils/component.js";
import { ComponentType } from "../../../utils/global-types/index.js";
import ConcatClasses from "../../../utils/concat-classes.js";

type UiAvatarType = ComponentType & {
  width: string;
  height: string;
  src?: string;
  alt: string;
  variant?: "circle";
};
class UiAvatar extends Component {
  render(): DocumentFragment {
    return this.compile(avatar, this.props);
  }
}
export default (props: UiAvatarType) =>
  new UiAvatar("div", {
    ...props,
    attributes: {
      ...props.attributes,
      class: ConcatClasses(
        { circle: "avatar avatar__circle" }[props.variant || "circle"],
        props.className,
      ),
    },
  });
