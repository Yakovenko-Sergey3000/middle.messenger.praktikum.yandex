import "./sign-out.css";
import Handlebars from "handlebars";
import signOutForm from "./sign-out.hbs";
import { widgetAuthForm } from "@widgets/auth-form/index.js";
import { widgetFormLabel } from "@widgets/form-label/index.js";
import { uiFlushedInput } from "@ui/inputs/index.js";
import { uiButtonLink, uiButtonMain } from "@ui/buttons/index.js";

Handlebars.registerPartial(
  "email",
  widgetFormLabel({
    label: "Почта",
    element: uiFlushedInput({
      name: "email",
      type: "email",
    }),
  }),
);

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
  "first_name",
  widgetFormLabel({
    label: "Имя",
    element: uiFlushedInput({
      name: "first_name",
    }),
  }),
);

Handlebars.registerPartial(
  "last_name",
  widgetFormLabel({
    label: "Фамилия",
    element: uiFlushedInput({
      name: "last_name",
    }),
  }),
);

Handlebars.registerPartial(
  "phone",
  widgetFormLabel({
    label: "Телефон",
    element: uiFlushedInput({
      name: "phone",
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
  "confirm_password",
  widgetFormLabel({
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
  widgetAuthForm({
    title: "Регистрация",
    content: Handlebars.compile(signOutForm)(),
  });
