import { ModuleChatList } from "@modules/chat/chats-list/index.ts";
import { ModuleDialog } from "@modules/chat/dialog/index.ts";

import { LayoutChat } from "./chat-layout/index.ts";
import Component from "../../utils/component.ts";

class Chat extends Component {
  constructor() {
    super("div", {});

    this.children.chat = LayoutChat({
      chatsList: ModuleChatList(),
      chatDialog: ModuleDialog(),
    });
  }

  render(): DocumentFragment {
    return this.compile("{{{ chat }}}", this.props);
  }
}

export default () => new Chat();

// {
//   chatListContent: moduleChatList(),
//     chatDialogContent: moduleDialog(),
// }
