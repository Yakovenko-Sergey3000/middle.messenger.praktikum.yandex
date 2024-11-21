import {
  SettingLayout,
  SettingsField,
  SettingsWrapper,
} from "@modules/user/settings/components/index.ts";
import { USER_SETTING_FIELDS } from "@modules/user/settings/components/user-setting-fields.ts";
import { UiInput } from "@ui/inputs/index.ts";
import { UiForm } from "@ui/form/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { ChangeUserProfileType, SettingsUserType } from "@modules/user/types.js";
import UserActions from "@modules/user/actions.js";
import Component, { IComponent } from "../../../../utils/component.ts";
import ChatValidator from "../../../../utils/validation/chat-validator.ts";
import { Connect } from "../../../../store/connect.js";
import ChangeUserAvatar from "../components/change-user-avatar/script.ts";

class ChangeInformation extends Component {
  constructor(props: SettingsUserType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile("{{{ form }}}", this.props);
  }
}

export default () =>
  new (Connect(ChangeInformation, (state) => {
    const userActions = new UserActions();
    const validator = new ChatValidator();
    const fields: Record<string, IComponent> = {};

    const savaBtn = UiButton({
      label: "Сохранить",
      attributes: { type: "submit" },
    });

    const onBlue = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const { isValid, errors } = validator.userInformation({ [target.name]: target.value });

      if (!isValid) {
        const field = errors[0];
        fields[field.key].setProps({
          error: field.message,
        });
      } else {
        fields[target.name].setProps({
          error: "",
        });
      }
    };

    const onSubmit = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const fd: FormData = new FormData(target);
      const data: Record<string, FormDataEntryValue> = {};

      fd.forEach((val, key) => {
        data[key] = val;
      });

      const { isValid, errors } = validator.userInformation(data);
      errors.forEach((error) => {
        fields[error.key].setProps({
          error: error.message,
        });
      });

      if (!isValid) {
        return;
      }

      savaBtn.setProps({ isLoading: true });

      userActions.updateUser(data as ChangeUserProfileType, {
        onError: (err) => {
          savaBtn.setProps({ isLoading: false });

          if (err) {
            fields[err.key].setProps({ error: err.msg });
          }
        },
      });
    };

    return {
      user: state.user,
      form: UiForm({
        content: SettingLayout({
          content: SettingsWrapper({
            avatar: ChangeUserAvatar({ src: state.user?.avatar || "" }),
            fields: USER_SETTING_FIELDS.map((filed) => {
              const settingField = SettingsField({
                leftContent: filed.label,
                rightContent: UiInput({
                  className: "input-begin-right",
                  attributes: {
                    name: [filed.name],
                    value: state.user ? state.user[filed.name] : "",
                  },
                  variant: "un-styled",
                  onBlur: onBlue.bind(this),
                }),
              });

              fields[filed.name] = settingField;
              return settingField;
            }),
            saveButton: savaBtn,
          }),
        }),
        onSubmit: onSubmit.bind(this),
      }),
    };
  }))();
