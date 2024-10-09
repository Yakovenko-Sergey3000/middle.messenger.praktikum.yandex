import "./dialog.css";
import Handlebars from "handlebars";
import dialog from "./dialog.tmpl.js";
import { uiFilledInput } from "@ui/inputs/index.js";
import { uiButtonCircle } from "@ui/buttons/index.js";
import addFileIcon from "@icons/add-file-icon.svg";

Handlebars.registerPartial(
  "send_message_button",
  uiButtonCircle({
    label: "➔",
  }),
);

Handlebars.registerPartial(
  "message_input",
  uiFilledInput({
    name: "message",
    className: "send-message-input",
    placeholder: "Сообщение",
  }),
);

const tmp = Handlebars.compile(dialog);
export default () =>
  tmp({
    user_name: "Вадим",
    sct_file_icon: addFileIcon,
  });
