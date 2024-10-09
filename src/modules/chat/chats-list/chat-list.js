import "./chat-list.css";
import Handlebars from "handlebars";
import chatList from "./chat-list.tmpl.js";
import { uiFilledInput } from "@ui/inputs/index.js";
import { uiChatItem } from "@ui/chat-item/index.js";
import searchIcon from "@icons/search-icon.svg";
import rightArrow from "@icons/right-arrow_v1.svg";
import { chatsList } from "@modules/chat/chats-list/mock-messages-data.js";

Handlebars.registerPartial(
  "search_input",
  uiFilledInput({
    name: "chats-search",
    className: "search-input",
  }),
);

Handlebars.registerPartial("chat_item", uiChatItem);

const tmp = Handlebars.compile(chatList);
export default () =>
  tmp({
    chats_list: chatsList,
    src_search_icon: searchIcon,
    src_arrow_head: rightArrow,
  });
