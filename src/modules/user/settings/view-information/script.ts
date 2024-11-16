import "./styles.css";
import {
  SettingLayout,
  SettingsField,
  SettingsWrapper,
} from "@modules/user/settings/components/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { USER_SETTING_FIELDS } from "@modules/user/settings/components/user-setting-fields.ts";
import { UserType } from "@utils/global-types/index.js";
import { LogOutBtn } from "@modules/auth/index.js";
import Component from "../../../../utils/component.ts";
import { PagesPath } from "../../../../pages-path.ts";

type ViewInformationTypeProps = {
  user: UserType;
};
class ViewInformation extends Component {
  constructor(props: ViewInformationTypeProps) {
    super("div", props);

    this.children.wrapper = SettingsWrapper({
      user: props.user,
      fields: USER_SETTING_FIELDS.map((filed) =>
        SettingsField({
          leftContent: filed.label,
          rightContent: props.user[filed.name] || "",
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
          leftContent: LogOutBtn(),
        }),
      ],
    });
  }

  render(): DocumentFragment {
    return this.compile("{{{ wrapper }}}", this.props);
  }
}

export default (props: ViewInformationTypeProps) =>
  SettingLayout({
    content: new ViewInformation(props),
  });
