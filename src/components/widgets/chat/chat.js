import "./chat.css";
import Handlebars from "handlebars";
import chat from "./chat.tmpl.js";

const emptyTmp = Handlebars.compile("");
const tmp = Handlebars.compile(chat);
export default ({
  chatListContent = emptyTmp,
  chatDialogContent = emptyTmp,
} = {}) => {
  Handlebars.registerPartial("chat_list_content", chatListContent);
  Handlebars.registerPartial("chat_dialog_content", chatDialogContent);

  return tmp();
};
