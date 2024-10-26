import "./style.css";
import Component from "../../../../../utils/component.js";
import { ComponentType } from "../../../../../utils/global-types/index.js";
import ConcatClasses from "../../../../../utils/concat-classes.js";

type MessageItemType = ComponentType & {
  message: string;
};
class MessageItem extends Component {
  render(): DocumentFragment {
    return this.compile("{{{ message }}}", this.props);
  }
}

export default (props: MessageItemType) =>
  new MessageItem("div", {
    ...props,
    attributes: { class: ConcatClasses("message-item", props.className) },
  });
