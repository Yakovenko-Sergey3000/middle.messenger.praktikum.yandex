import "./styles.css";
import { UiFormLabel } from "@ui/form-label/index.js";
import { SignOutFieldType } from "@modules/auth/sign-out/types.js";
import { FIELDS } from "@modules/auth/sign-out/fields.js";
import { UiInput } from "@ui/inputs/index.js";
import { UiButton } from "@ui/buttons/index.js";
import template from "./template.hbs.js";
import Component from "../../../utils/component.js";
import AuthFormLayout from "../auth-form-layout/script.js";
import { PagesPath } from "../../../pages-path.js";

class SignOut extends Component {
  constructor() {
    super("div", { attributes: { class: "sign-out-form" } });
    this.#registrationFields(FIELDS);
    this.children.submitButton = UiButton({
      attributes: { type: "submit" },
      label: "Зарегестрироваться",
    });
    this.children.linkButton = UiButton({
      variant: "link",
      label: "Войти",
      attributes: { type: "button" },
      onClick: () => {
        window.location.replace(PagesPath.SIGN_IN);
      },
    });
  }

  #registrationFields(fields: SignOutFieldType[]) {
    fields.forEach((field) => {
      this.children[field.name] = UiFormLabel({
        label: field.label,
        forId: field.id,
        element: UiInput({
          attributes: {
            id: field.id,
            name: field.name,
            type: field.type || "text",
            autocomplete: field.autocomplete,
          },
          variant: "flushed",
        }),
      });
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default () =>
  AuthFormLayout({
    title: "Регистрация",
    content: new SignOut(),
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
