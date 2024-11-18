import { ModuleChatList } from "@modules/chat/chats-list/index.ts";
import { LayoutChat } from "./chat-layout/index.ts";
import Component, { IComponent } from "../../utils/component.ts";

class Chat extends Component {
  constructor(Dialog?: IComponent) {
    super("div", {});

    this.children.chat = LayoutChat({
      chatsList: ModuleChatList(),
      chatDialog: Dialog && Dialog,
    });
  }

  render(): DocumentFragment {
    return this.compile("{{{ chat }}}", this.props);
  }
}

export default (props?: IComponent) => new Chat(props);
