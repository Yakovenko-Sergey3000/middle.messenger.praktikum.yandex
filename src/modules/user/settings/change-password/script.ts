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
import { UserType } from "@utils/global-types/index.js";
import UserAvatar from "../components/user-avatar/script.ts";
import Component, { IComponent } from "../../../../utils/component.ts";
import ChatValidator from "../../../../utils/validation/chat-validator.ts";
import { Connect } from "../../../../store/connect.js";

class ChangePassword extends Component {
  constructor(props: { user: UserType }) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile("{{{ wrapper }}}", this.props);
  }
}

export default () => {
  const ChangePasswordWithState = Connect(ChangePassword, (state) => {
    const formFields: Record<string, IComponent> = {};
    const validator = new ChatValidator();
    const setPasswordsFromFields = () =>
      USER_PASSWORD_FIELDS.map((data) => {
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

        formFields[data.name] = field;
        return field;
      });

    const onSubmit = (e: Event) => {
      e.preventDefault();
      const userActions = new UserActions();
      const target = e.target as HTMLFormElement;
      const fd: FormData = new FormData(target);
      const data: Record<string, FormDataEntryValue> = {};

      fd.forEach((val, key) => {
        data[key] = val;
      });

      const { isValid, errors } = validator.userInformation(data);

      errors.forEach((error) => {
        formFields[error.key].setProps({
          error: error.message,
        });
      });

      if (!isValid) {
        return;
      }
      userActions.changePassword(data as ChangePasswordType, () => target.reset());
    };

    return {
      wrapper: SettingLayout({
        content: UiForm({
          content: SettingsWrapper({
            avatar: UserAvatar(state.user.avatar),
            fields: setPasswordsFromFields(),
            saveButton: UiButton({
              label: "Сохранить",
              attributes: { type: "submit" },
            }),
          }),
          onSubmit: onSubmit.bind(this),
        }),
      }),
    };
  });

  return new ChangePasswordWithState();
};
