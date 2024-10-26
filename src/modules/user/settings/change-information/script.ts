import {
  SettingLayout,
  SettingsField,
  SettingsWrapper,
} from "@modules/user/settings/components/index.js";
import { USER_SETTING_FIELDS } from "@modules/user/settings/components/user-setting-fields.js";
import { UiInput } from "@ui/inputs/index.js";
import { UiForm } from "@ui/form/index.js";
import { UiButton } from "@ui/buttons/index.js";
import { UserType } from "../../../../utils/global-types/index.js";
import Component, { IComponent } from "../../../../utils/component.js";
import { USERS } from "../../../../enums.js";
import ChatValidator, { IChatValidator } from "../../../../utils/validation/chat-validator.js";

class ChangeInformation extends Component {
  validator: IChatValidator;

  fields: Record<string, IComponent>;

  constructor(props: { user: UserType }) {
    super("div", props);
    this.validator = new ChatValidator();
    this.fields = {};

    this.children.form = UiForm({
      content: SettingsWrapper({
        user: props.user,
        fields: USER_SETTING_FIELDS.map((filed) => {
          const settingField = SettingsField({
            leftContent: filed.label,
            rightContent: UiInput({
              className: "input-begin-right",
              attributes: { name: [filed.name], value: props.user[filed.name] },
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

    console.log(data);
  }

  render(): DocumentFragment {
    return this.compile("{{{ form }}}", this.props);
  }
}

export default () =>
  SettingLayout({
    content: new ChangeInformation({
      user: USERS[0],
    }),
  });
