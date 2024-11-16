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
import ChatValidator, { IChatValidator } from "../../../../utils/validation/chat-validator.ts";
import { Connect } from "../../../../store/connect.js";

class ChangeInformation extends Component {
  validator: IChatValidator;

  fields: Record<string, IComponent>;

  constructor(props: SettingsUserType) {
    super("div", props);
    this.validator = new ChatValidator();
    this.fields = {};

    this.children.form = UiForm({
      content: SettingLayout({
        content: SettingsWrapper({
          user: props.user,
          fields: USER_SETTING_FIELDS.map((filed) => {
            const settingField = SettingsField({
              leftContent: filed.label,
              rightContent: UiInput({
                className: "input-begin-right",
                attributes: { name: [filed.name], value: props.user[filed.name] || "" },
                variant: "un-styled",
                onBlur: this.onBlue.bind(this),
              }),
            });

            this.fields[filed.name] = settingField;
            return settingField;
          }),
          saveButton: UiButton({
            label: "Сохранить",
            attributes: { type: "submit" },
          }),
        }),
      }),
      onSubmit: this.onSubmit.bind(this),
    });
  }

  onBlue(e: Event) {
    const target = e.target as HTMLInputElement;
    const { isValid, errors } = this.validator.userInformation({ [target.name]: target.value });

    if (!isValid) {
      const field = errors[0];
      this.fields[field.key].setProps({
        error: field.message,
      });
    } else {
      this.fields[target.name].setProps({
        error: "",
      });
    }
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
      this.fields[error.key].setProps({
        error: error.message,
      });
    });

    if (!isValid) {
      return;
    }

    userActions.updateUser(data as ChangeUserProfileType);
  }

  render(): DocumentFragment {
    return this.compile("{{{ form }}}", this.props);
  }
}

export default () => {
  const ChangeInformationWithStore = Connect(ChangeInformation, (state) => ({ user: state.user }));

  return new ChangeInformationWithStore();
};
