import "./sing-in.css";
import Handlebars from "handlebars";
import signInFrom from "./sing-in.tmpl.js";
import { widgetFormLabel } from "@widgets/form-label/index.js";
import { uiFlushedInput } from "@ui/inputs/index.js";
import { uiButtonLink, uiButtonMain } from "@ui/buttons/index.js";
import { widgetAuthForm } from "@widgets/auth-form/index.js";

Handlebars.registerPartial(
  "login",
  widgetFormLabel({
    label: "Логин",
    element: uiFlushedInput({
      name: "login",
    }),
  }),
);

Handlebars.registerPartial(
  "password",
  widgetFormLabel({
    label: "Пароль",
    element: uiFlushedInput({
      type: "password",
      name: "password",
    }),
  }),
);

Handlebars.registerPartial(
  "button",
  uiButtonMain({
    type: "submit",
    label: "Авторизоваться",
  }),
);

Handlebars.registerPartial(
  "link_button",
  uiButtonLink({
    label: "Нет аккаунта?",
  }),
);

const tmp = Handlebars.compile(signInFrom);

export default () =>
  widgetAuthForm({
    title: "Вход",
    content: tmp(),
    className: "sign-in-wrapper",
  });
