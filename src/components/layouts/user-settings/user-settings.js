import "./user-settings.css";
import Handlebars from "handlebars";
import settingUser from "./user-settings.hbs";
import { uiButtonCircle } from "@ui/buttons/index.js";

Handlebars.registerPartial(
  "return_back_button",
  uiButtonCircle({
    label: "⇤",
    className: "return-back-button",
  }),
);
export default ({ content, backHref = "/" } = {}) => {
  Handlebars.registerPartial("content", content);

  return Handlebars.compile(settingUser)({
    back_href: backHref,
  });
};
