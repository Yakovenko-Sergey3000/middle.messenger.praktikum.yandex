import "./styles.css";
import { UiAvatar } from "@ui/avatar/index.js";
import template from "./template.hbs.js";
import { ComponentType, UserType } from "../../../utils/global-types/index.js";
import Component from "../../../utils/component.js";
import ConcatClasses from "../../../utils/concat-classes.js";
import longText from "../../../utils/long-text.js";

export type UiChatItemType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: UserType;
    time: string;
    content: string;
  };
  onClick?: (chatId: number) => void;
};

class UiChatItem extends Component {
  constructor(props: UiChatItemType & ComponentType) {
    super("div", {
      ...props,
      attributes: { class: ConcatClasses("chat-item", props.className) },
      avatar: UiAvatar({
        width: "47px",
        height: "47px",
        alt: "Avatar",
        src: props.avatar,
      }),
      last_message: longText(props.last_message.content, 45),
      time: "ПН",
      onClick: () => props.onClick && props.onClick(props.id),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
export default (props: UiChatItemType & ComponentType) => new UiChatItem(props);
