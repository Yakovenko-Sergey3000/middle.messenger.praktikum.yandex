import "./styles.css";
import { UiInput } from "@ui/inputs/index.js";
import { UiButton } from "@ui/buttons/index.js";
import { UiFormLabel } from "@ui/form-label/index.js";
import { FIELDS } from "@modules/auth/sign-in/fields.js";
import { AuthFieldType } from "@modules/auth/types.js";
import template from "./template.hbs.js";
import AuthFormLayout from "../auth-form-layout/script.js";
import Component from "../../../utils/component.js";
import { PagesPath } from "../../../pages-path.js";
import ChatValidator, { IChatValidator } from "../../../utils/validation/chat-validator.js";

class SignIn extends Component {
  validator: IChatValidator;

  constructor() {
    super("div", { attributes: { class: "sign-in-form" } });
    this.validator = new ChatValidator();
    this.#registrationFields(FIELDS);

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

  onBlur(e: Event) {
    const target = e.target as HTMLInputElement;
    const { isValid, errors } = this.validator.userInformation({ [target.name]: target.value });

    if (!isValid) {
      const field = errors[0];
      this.children[field.key].setProps({
        error: field.message,
      });
    } else {
      this.children[target.name].setProps({
        error: "",
      });
    }
  }

  #registrationFields(fields: AuthFieldType[]) {
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
          onBlur: this.onBlur.bind(this),
        }),
      });
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default () => {
  const signInForm = new SignIn();
  return AuthFormLayout({
    title: "Вход",
    content: signInForm,
    onSubmit: (e: Event) => {
      e.preventDefault();
      const { validator } = signInForm;
      const target = e.target as HTMLFormElement;
      const fd: FormData = new FormData(target);
      const data: Record<string, FormDataEntryValue> = {};

      fd.forEach((val, key) => {
        data[key] = val;
      });

      const { isValid, errors } = validator.userInformation(data);

      errors.forEach((error) =>
        signInForm.children[error.key].setProps({
          error: error.message,
        }),
      );

      if (!isValid) {
        return;
      }

      console.log(data);
      target.reset();
    },
  });
};
