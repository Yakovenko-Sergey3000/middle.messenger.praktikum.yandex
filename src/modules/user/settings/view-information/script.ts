import "./styles.css";
import {
  SettingLayout,
  SettingsField,
  SettingsWrapper,
} from "@modules/user/settings/components/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { USER_SETTING_FIELDS } from "@modules/user/settings/components/user-setting-fields.ts";
import Component from "../../../../utils/component.ts";
import { USERS } from "../../../../enums.ts";
import { UserType } from "../../../../utils/global-types/index.ts";
import { PagesPath } from "../../../../pages-path.ts";

class ViewInformation extends Component {
  constructor(props: { user: UserType }) {
    super("div", props);

    this.children.wrapper = SettingsWrapper({
      user: props.user,
      fields: USER_SETTING_FIELDS.map((filed) =>
        SettingsField({
          leftContent: filed.label,
          rightContent: props.user[filed.name],
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
