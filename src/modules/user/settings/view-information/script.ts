import "./styles.css";
import {
  SettingLayout,
  SettingsField,
  SettingsWrapper,
} from "@modules/user/settings/components/index.js";
import { UiButton } from "@ui/buttons/index.js";
import { USER_SETTING_FIELDS } from "@modules/user/settings/components/user-setting-fields.js";
import Component from "../../../../utils/component.js";
import { USERS } from "../../../../enums.js";
import { UserType } from "../../../../utils/global-types/index.js";
import { PagesPath } from "../../../../pages-path.js";

class ViewInformation extends Component {
  constructor(props: { user: UserType }) {
    super("div", props);

    this.children.wrapper = SettingsWrapper({
      user: props.user,
      fields: USER_SETTING_FIELDS.map((filed) =>
        SettingsField({
          leftContent: filed.label,
          rightContent: props.user[filed.key],
        }),
      ),
      actions: [
        SettingsField({
          leftContent: UiButton({
            label: "Изменить данные",
            variant: "link",
            onClick: () => window.location.replace(PagesPath.CHANGE_USER_SETTING),
          }),
        }),
        SettingsField({
          leftContent: UiButton({
            label: "Изменить пароль",
            variant: "link",
            onClick: () => window.location.replace(PagesPath.CHANGE_USER_PASSWORD),
          }),
        }),
        SettingsField({
          leftContent: UiButton({
            label: "Выйти",
            variant: "link",
            className: "exit-button",
            onClick: () => window.location.replace(PagesPath.HOME),
          }),
        }),
      ],
    });
  }

  render(): DocumentFragment {
    return this.compile("{{{ wrapper }}}", this.props);
  }
}

export default () =>
  SettingLayout({
    content: new ViewInformation({
      user: USERS[0],
    }),
  });
