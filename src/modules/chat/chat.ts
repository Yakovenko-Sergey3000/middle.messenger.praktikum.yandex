import { moduleChatList } from "@modules/chat/chats-list/index.js";
import { moduleDialog } from "@modules/chat/dialog/index.js";
import { layoutChat } from "./chat-layout/index.js";

export default () => layoutChat({
  chatListContent: moduleChatList(),
  chatDialogContent: moduleDialog(),
});
