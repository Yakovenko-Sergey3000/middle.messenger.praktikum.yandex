import { ModuleChatList } from "@modules/chat/chats-list/index.js";
import { ModuleDialog } from "@modules/chat/dialog/index.js";

import { LayoutChat } from "./chat-layout/index.js";
import Component from "../../utils/component.js";

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
