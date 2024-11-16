import "./styles.css";
import { UiFormLabel } from "@ui/form-label/index.ts";
import { FIELDS } from "@modules/auth/sign-out/fields.ts";
import { UiInput } from "@ui/inputs/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { AuthFieldType, SignUpType } from "@modules/auth/types.ts";
import { AuthAction } from "@modules/auth/index.js";
import template from "./template.hbs.ts";
import Component from "../../../utils/component.ts";
import AuthFormLayout from "../auth-form-layout/script.ts";
import { PagesPath } from "../../../pages-path.ts";
import ChatValidator, { IChatValidator } from "../../../utils/validation/chat-validator.ts";
import Router from "../../../utils/router/index.js";

class SignOut extends Component {
  validator: IChatValidator;

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
      onClick: () => new Router().go(PagesPath.SIGN_IN),
    });

    this.validator = new ChatValidator();
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
  const signOutForm = new SignOut();
  const action = new AuthAction();

  return AuthFormLayout({
    title: "Регистрация",
    content: signOutForm,
    onSubmit: (e: Event) => {
      e.preventDefault();
      const { validator } = signOutForm;
      const target = e.target as HTMLFormElement;
      const fd: FormData = new FormData(target);
      const data: Record<string, FormDataEntryValue> = {};

      fd.forEach((val, key) => {
        data[key] = val;
      });

      const { isValid, errors } = validator.userInformation(data);

      errors.forEach((error) => {
        signOutForm.children[error.key].setProps({
          error: error.message,
        });
      });

      if (!isValid) {
        return;
      }

      action.signUp(data as SignUpType, { onSuccess: () => target.reset(), onError: () => {} });
    },
  });
};
