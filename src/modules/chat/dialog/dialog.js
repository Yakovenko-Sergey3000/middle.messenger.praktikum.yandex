import "./dialog.css";
import Handlebars from "handlebars";
import dialog from "./dialog.hbs";
import { uiFilledInput } from "@ui/inputs/index.js";
import { uiButtonCircle } from "@ui/buttons/index.js";
import addFileIcon from "@icons/add-file-icon.svg";
import { uiCircleAvatar } from "@ui/avatar/index.js";

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

Handlebars.registerPartial("dialog_avatar", uiCircleAvatar());
export default () =>
  Handlebars.compile(dialog)({
    user_name: "Вадим",
    sct_file_icon: addFileIcon,
  });
