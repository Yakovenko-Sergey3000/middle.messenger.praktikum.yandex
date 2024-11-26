import "./style.css";
import Component from "../../../../../utils/component.ts";
import { ComponentType } from "../../../../../utils/global-types/index.ts";
import ConcatClasses from "../../../../../utils/concat-classes.ts";

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
