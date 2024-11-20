import { ModuleChatList } from "@modules/chat/chats-list/index.ts";
import ChatsActions from "@modules/chat/actions.js";
import { LayoutChat } from "./chat-layout/index.ts";
import Component, { IComponent } from "../../utils/component.ts";

type ChatDialogType = (prop: ChatsActions) => IComponent;
class Chat extends Component {
  constructor(Dialog?: ChatDialogType) {
    super("div", {});
    const chatActions = new ChatsActions();

    this.children.chat = LayoutChat({
      chatsList: ModuleChatList(chatActions),
      chatDialog: Dialog && Dialog(chatActions),
    });
  }

  render(): DocumentFragment {
    return this.compile("{{{ chat }}}", this.props);
  }
}

export default (props?: ChatDialogType) => new Chat(props);
