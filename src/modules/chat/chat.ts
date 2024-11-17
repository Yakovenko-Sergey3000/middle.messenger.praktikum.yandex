import { ModuleChatList } from "@modules/chat/chats-list/index.ts";

import { LayoutChat } from "./chat-layout/index.ts";
import Component, { IComponent } from "../../utils/component.ts";

class Chat extends Component {
  constructor(Dialog?: new () => IComponent) {
    super("div", {});

    this.children.chat = LayoutChat({
      chatsList: new ModuleChatList(),
      chatDialog: Dialog !== undefined ? new Dialog() : Dialog,
    });
  }

  render(): DocumentFragment {
    return this.compile("{{{ chat }}}", this.props);
  }
}

export default () => new Chat();
