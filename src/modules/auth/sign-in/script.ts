import "./styles.css";
import { UiInput } from "@ui/inputs/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { UiFormLabel } from "@ui/form-label/index.ts";
import { FIELDS } from "@modules/auth/sign-in/fields.ts";
import { AuthFieldType, SignInType } from "@modules/auth/types.ts";
import AuthActions from "@modules/auth/actions.ts";
import template from "./template.hbs.ts";
import AuthFormLayout from "../auth-form-layout/script.ts";
import Component, { IComponent } from "../../../utils/component.ts";
import { PagesPath } from "../../../pages-path.ts";
import ChatValidator, { IChatValidator } from "../../../utils/validation/chat-validator.ts";
import Router from "../../../utils/router/index.ts";

class SignIn extends Component {
  validator: IChatValidator;

  constructor(props: { submitButton: IComponent }) {
    super("div", { ...props, attributes: { class: "sign-in-form" } });
    this.validator = new ChatValidator();
    this.#registrationFields(FIELDS);

    this.children.linkButton = UiButton({
      label: "Нет аккаунта",
      variant: "link",
      attributes: { type: "button" },
      onClick: () => new Router().go(PagesPath.SING_OUT),
    });
  }

  onBlur(e: Event) {
    const target = e.target as HTMLInputElement;
    const { isValid, errors } = this.validator.signIn({ [target.name]: target.value });

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
  const button = UiButton({
    label: "Авторизоваться",
    attributes: { type: "submit" },
  });

  const signInForm = new SignIn({ submitButton: button });
  const authAction = new AuthActions();

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

      const { isValid, errors } = validator.signIn(data);

      errors.forEach((error) =>
        signInForm.children[error.key].setProps({
          error: error.message,
        }),
      );

      if (!isValid) {
        return;
      }

      button.setProps({ isLoading: true });

      authAction.signIn(data as SignInType, {
        onSuccess: () => {
          target.reset();
        },
        onError: (msg) => {
          button.setProps({ isLoading: false });
          signInForm.setProps({ error: msg });
        },
      });
    },
  });
};
