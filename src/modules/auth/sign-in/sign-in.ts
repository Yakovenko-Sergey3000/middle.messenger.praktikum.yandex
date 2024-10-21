import "./sing-in.css";
import Handlebars from "handlebars";
import signInFrom from "./sing-in.hbs.js";
import { uiFlushedInput } from "@ui/inputs/index.js";
import { uiButtonLink, uiButtonMain } from "@ui/buttons/index.js";
import { uiFormLabel } from "@ui/form-label/index.js";
import layoutAuthForm from "../auth-form-layout/auth-form.js";

export default () => {
  Handlebars.registerPartial(
    "login",
    uiFormLabel({
      label: "Логин",
      id: "login",
      element: uiFlushedInput({
        name: "login",
        id: "login",
      }),
    }),
  );

  Handlebars.registerPartial(
    "password",
    uiFormLabel({
      label: "Пароль",
      id: "password",
      element: uiFlushedInput({
        type: "password",
        name: "password",
        id: "password",
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

  return layoutAuthForm({
    title: "Вход",
    content: Handlebars.compile(signInFrom)({}),
    className: "sign-in-wrapper",
  });
};
