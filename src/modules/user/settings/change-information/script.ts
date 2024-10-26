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
import Component from "../../../../utils/component.js";
import { USERS } from "../../../../enums.js";

class ChangeInformation extends Component {
  constructor(props: { user: UserType }) {
    super("div", props);

    this.children.form = UiForm({
      content: SettingsWrapper({
        user: props.user,
        fields: USER_SETTING_FIELDS.map((filed) =>
          SettingsField({
            leftContent: filed.label,
            rightContent: UiInput({
              className: "input-begin-right",
              attributes: { name: [filed.name], value: props.user[filed.name] },
              variant: "un-styled",
            }),
          }),
        ),
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
