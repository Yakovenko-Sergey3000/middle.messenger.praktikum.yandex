import { widgetChat } from "@widgets/chat/index.js";
import { moduleChatList } from "@modules/chat/chats-list/index.js";
export default () =>
  widgetChat({
    chatListContent: moduleChatList(),
  });
