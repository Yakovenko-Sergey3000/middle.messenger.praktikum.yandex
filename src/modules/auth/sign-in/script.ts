import "./styles.css";
import { UiInput } from "@ui/inputs/index.js";
import { UiButton } from "@ui/buttons/index.js";
import { UiFormLabel } from "@ui/form-label/index.js";
import template from "./template.hbs.js";
import AuthFormLayout from "../auth-form-layout/script.js";
import Component from "../../../utils/component.js";
import { PagesPath } from "../../../pages-path.js";

class Script extends Component {
  constructor() {
    super("div", { attributes: { class: "sign-in-form" } });
    this.children.login = UiFormLabel({
      label: "Логин",
      forId: "login-id",
      element: UiInput({
        variant: "flushed",
        attributes: { id: "login-id", name: "login" },
      }),
    });

    this.children.password = UiFormLabel({
      label: "Пароль",
      forId: "password-id",
      element: UiInput({
        variant: "flushed",
        attributes: { id: "password-id", name: "password", type: "password" },
      }),
    });

    this.children.submitButton = UiButton({
      label: "Авторизоваться",
      attributes: { type: "submit" },
    });

    this.children.linkButton = UiButton({
      label: "Нет аккаунта",
      variant: "link",
      attributes: { type: "button" },
      onClick: () => {
        window.location.replace(PagesPath.SING_OUT);
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default () =>
  AuthFormLayout({
    title: "Вход",
    content: new Script(),
    onSubmit: (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const fd: FormData = new FormData(target);
      const data: Record<string, FormDataEntryValue> = {};

      fd.forEach((val, key) => {
        data[key] = val;
      });

      console.log(data);
      target.reset();
    },
  });
