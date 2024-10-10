import "./sing-in.css";
import Handlebars from "handlebars";
import signInFrom from "./sing-in.hbs";
import { uiFlushedInput } from "@ui/inputs/index.js";
import { uiButtonLink, uiButtonMain } from "@ui/buttons/index.js";
import { uiFormLabel } from "@ui/form-label/index.js";
import { layoutAuthForm } from "@layouts/auth-form/index.js";

Handlebars.registerPartial(
  "login",
  uiFormLabel({
    label: "Логин",
    element: uiFlushedInput({
      name: "login",
    }),
  }),
);

Handlebars.registerPartial(
  "password",
  uiFormLabel({
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

export default () =>
  layoutAuthForm({
    title: "Вход",
    content: Handlebars.compile(signInFrom)(),
    className: "sign-in-wrapper",
  });
