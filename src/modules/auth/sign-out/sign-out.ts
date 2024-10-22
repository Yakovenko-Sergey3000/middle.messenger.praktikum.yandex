import "./sign-out.css";
import Handlebars from "handlebars";
import { uiFlushedInput } from "@ui/inputs/index.js";
import { uiButtonLink, uiButtonMain } from "@ui/buttons/index.js";
import { uiFormLabel } from "@ui/form-label/index.js";
import layoutAuthForm from "../auth-form-layout/auth-form.js";
import signOutForm from "./sign-out.hbs.js";

export default () => {
  Handlebars.registerPartial(
    "email",
    uiFormLabel({
      label: "Почта",
      id: "email",
      element: uiFlushedInput({
        name: "email",
        type: "email",
        id: "email",
      }),
    }),
  );

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
    "first_name",
    uiFormLabel({
      label: "Имя",
      id: "first_name",
      element: uiFlushedInput({
        name: "first_name",
        id: "first_name",
      }),
    }),
  );

  Handlebars.registerPartial(
    "second_name",
    uiFormLabel({
      label: "Фамилия",
      id: "second_name",
      element: uiFlushedInput({
        name: "second_name",
        id: "second_name",
      }),
    }),
  );

  Handlebars.registerPartial(
    "phone",
    uiFormLabel({
      label: "Телефон",
      id: "phone",
      element: uiFlushedInput({
        name: "phone",
        id: "phone",
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
    "confirm_password",
    uiFormLabel({
      label: "Пароль (еще раз)",
      id: "confirm_password",
      element: uiFlushedInput({
        type: "password",
        name: "confirm_password",
        id: "confirm_password",
      }),
    }),
  );

  Handlebars.registerPartial(
    "button",
    uiButtonMain({
      type: "submit",
      label: "Зарегестрироваться",
    }),
  );

  Handlebars.registerPartial(
    "link_button",
    uiButtonLink({
      type: "button",
      label: "Войти",
    }),
  );

  return layoutAuthForm({
    title: "Регистрация",
    content: Handlebars.compile(signOutForm)({}),
  });
};
