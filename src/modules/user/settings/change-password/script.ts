import { UiForm } from "@ui/form/index.js";
import {
  SettingLayout,
  SettingsField,
  SettingsWrapper,
} from "@modules/user/settings/components/index.js";
import { UiInput } from "@ui/inputs/index.js";
import { UiButton } from "@ui/buttons/index.js";
import { USER_PASSWORD_FIELDS } from "@modules/user/settings/components/user-password-fields.js";
import { UserType } from "../../../../utils/global-types/index.js";
import Component, { IComponent } from "../../../../utils/component.js";
import { USERS } from "../../../../enums.js";
import ChatValidator, { IChatValidator } from "../../../../utils/validation/chat-validator.js";

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
    console.log(data);
    target.reset();
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
