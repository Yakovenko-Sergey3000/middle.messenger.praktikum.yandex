import "./chat-list.css";
import Handlebars from "handlebars";
import { uiFilledInput } from "@ui/inputs/index.js";
import { uiChatItem } from "@ui/chat-item/index.js";
import searchIcon from "@icons/search-icon.svg";
import rightArrow from "@icons/right-arrow_v1.svg";
import { chatsList } from "@modules/chat/chats-list/mock-messages-data.js";
import chatList from "./chat-list.hbs.js";

export default () => {
  Handlebars.registerPartial(
    "search_input",
    uiFilledInput({
      name: "chats-search",
      className: "search-input",
      placeholder: "Поиск",
    }),
  );

  Handlebars.registerPartial("chat_item", uiChatItem);

  return Handlebars.compile(chatList)({
    chats_list: chatsList,
    src_search_icon: searchIcon,
    src_arrow_head: rightArrow,
  });
};
