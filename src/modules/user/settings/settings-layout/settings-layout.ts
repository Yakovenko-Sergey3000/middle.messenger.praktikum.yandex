import "./settings-layout.css";
import Handlebars from "handlebars";
import { uiButtonCircle } from "@ui/buttons/index.js";
import settingUser from "./settings-layout.hbs.js";

export default ({ content, backHref = "/" }) => {
  Handlebars.registerPartial(
    "return_back_button",
    uiButtonCircle({
      label: "⇤",
      className: "return-back-button",
    }),
  );

  Handlebars.registerPartial("content", content);

  return Handlebars.compile(settingUser)({
    back_href: backHref,
  });
};
