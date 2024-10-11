import "./sign-out.css";
import Handlebars from "handlebars";
import signOutForm from "./sign-out.hbs";
import { uiFlushedInput } from "@ui/inputs/index.js";
import { uiButtonLink, uiButtonMain } from "@ui/buttons/index.js";
import layoutAuthForm from "../auth-form-layout/auth-form.js";
import { uiFormLabel } from "@ui/form-label/index.js";

Handlebars.registerPartial(
  "email",
  uiFormLabel({
    label: "Почта",
    element: uiFlushedInput({
      name: "email",
      type: "email",
    }),
  }),
);

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
  "first_name",
  uiFormLabel({
    label: "Имя",
    element: uiFlushedInput({
      name: "first_name",
    }),
  }),
);

Handlebars.registerPartial(
  "last_name",
  uiFormLabel({
    label: "Фамилия",
    element: uiFlushedInput({
      name: "last_name",
    }),
  }),
);

Handlebars.registerPartial(
  "phone",
  uiFormLabel({
    label: "Телефон",
    element: uiFlushedInput({
      name: "phone",
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
  "confirm_password",
  uiFormLabel({
    label: "Пароль (еще раз)",
    element: uiFlushedInput({
      type: "password",
      name: "confirm_password",
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
export default () =>
  layoutAuthForm({
    title: "Регистрация",
    content: Handlebars.compile(signOutForm)(),
  });
