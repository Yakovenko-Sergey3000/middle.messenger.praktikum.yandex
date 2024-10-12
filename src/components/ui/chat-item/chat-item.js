import "./chat-item.css";
import Handlebars from "handlebars";
import chatItem from "./chat-item.hbs";
import { uiCircleAvatar } from "@ui/avatar/index.js";

Handlebars.registerHelper("time", (date) => {
  return "10:23";
});

Handlebars.registerHelper("long_message", (text) => {
  if (text.length > 45) {
    return text.slice(0, 45) + "...";
  }

  return text;
});

Handlebars.registerPartial("avatar", uiCircleAvatar());
export default ({
  name = "",
  last_message,
  message_created_at,
  unread_message_count,
} = {}) =>
  Handlebars.compile(chatItem)({
    name,
    last_message,
    message_created_at,
    unread_message_count,
  });
