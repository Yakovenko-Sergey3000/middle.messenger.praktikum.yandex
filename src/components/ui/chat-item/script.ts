import "./styles.css";
import { UiAvatar } from "@ui/avatar/index.ts";
import { ComponentType, UserType } from "@utils/global-types/index.ts";
import template from "./template.hbs.ts";
import Component from "../../../utils/component.ts";
import ConcatClasses from "../../../utils/concat-classes.ts";
import longText from "../../../utils/long-text.ts";

export type UiChatItemType = {
  id: number;
  title: string;
  avatar: string | null;
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
        src: props.avatar || "",
      }),
      last_message: props.last_message ? longText(props.last_message.content, 45) : "",
      time: "ПН",
      onClick: () => props.onClick && props.onClick(props.id),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default UiChatItem;
