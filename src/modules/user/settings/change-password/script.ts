import { UiForm } from "@ui/form/index.ts";
import {
  SettingLayout,
  SettingsField,
  SettingsWrapper,
} from "@modules/user/settings/components/index.ts";
import { UiInput } from "@ui/inputs/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { USER_PASSWORD_FIELDS } from "@modules/user/settings/components/user-password-fields.ts";
import UserActions from "@modules/user/actions.js";
import { ChangePasswordType } from "@modules/user/types.js";
import { UserType } from "../../../../utils/global-types/index.ts";
import Component, { IComponent } from "../../../../utils/component.ts";
import { USERS } from "../../../../enums.ts";
import ChatValidator, { IChatValidator } from "../../../../utils/validation/chat-validator.ts";

class ChangePassword extends Component {
  formFields: Record<string, IComponent> = {};

  validator: IChatValidator;

  constructor(props: { user: UserType }) {
    super("div", props);

    this.formFields = {};
    this.validator = new ChatValidator();
    this.children.form = UiForm({
      content: SettingsWrapper({
        user: props.user,
        fields: this.#setPasswordsFromFields(),
        saveButton: UiButton({
          label: "Сохранить",
          attributes: { type: "submit" },
        }),
      }),
      onSubmit: this.onSubmit.bind(this),
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const userActions = new UserActions();
    const target = e.target as HTMLFormElement;
    const fd: FormData = new FormData(target);
    const data: Record<string, FormDataEntryValue> = {};

    fd.forEach((val, key) => {
      data[key] = val;
    });

    const { isValid, errors } = this.validator.userInformation(data);

    errors.forEach((error) => {
      this.formFields[error.key].setProps({
        error: error.message,
      });
    });

    if (!isValid) {
      return;
    }
    userActions.changePassword(data as ChangePasswordType, () => target.reset());
  }

  #setPasswordsFromFields() {
    return USER_PASSWORD_FIELDS.map((data) => {
      const field = SettingsField({
        leftContent: data.label,
        rightContent: UiInput({
          className: "input-begin-right",
          attributes: {
            name: data.name,
            type: "password",
            autocomplete: "new-password",
            placeholder: "Введите пароль",
          },
          variant: "un-styled",
        }),
      });

      this.formFields[data.name] = field;
      return field;
    });
  }

  render(): DocumentFragment {
    return this.compile("{{{ form }}}", this.props);
  }
}

export default () =>
  SettingLayout({
    content: new ChangePassword({
      user: USERS[0],
    }),
  });
