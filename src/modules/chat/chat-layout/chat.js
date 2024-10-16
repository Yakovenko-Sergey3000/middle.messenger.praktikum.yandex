import "./chat.css";
import Handlebars from "handlebars";
import chat from "./chat.hbs";

const emptyTmp = Handlebars.compile("");
export default ({
  chatListContent = emptyTmp,
  chatDialogContent = emptyTmp,
} = {}) => {
  Handlebars.registerPartial("chat_list_content", chatListContent);
  Handlebars.registerPartial("chat_dialog_content", chatDialogContent);

  return Handlebars.compile(chat)();
};
