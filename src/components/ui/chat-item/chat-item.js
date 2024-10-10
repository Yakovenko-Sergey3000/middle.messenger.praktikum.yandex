import "./chat-item.css";
import Handlebars from "handlebars";
import chatItem from "./chat-item.hbs";

Handlebars.registerHelper("time", (date) => {
  return "10:23";
});

Handlebars.registerHelper("long_message", (text) => {
  if (text.length > 45) {
    return text.slice(0, 45) + "...";
  }

  return text;
});

const tmp = Handlebars.compile(chatItem);

export default ({
  name = "",
  last_message,
  message_created_at,
  unread_message_count,
} = {}) =>
  tmp({
    name,
    last_message,
    message_created_at,
    unread_message_count,
  });
