import "./styles.css";
import {
  SettingLayout,
  SettingsField,
  SettingsWrapper,
} from "@modules/user/settings/components/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { USER_SETTING_FIELDS } from "@modules/user/settings/components/user-setting-fields.ts";
import { LogOutBtn } from "@modules/auth/index.ts";
import Router from "@utils/router/index.ts";
import { SettingsUserType } from "@modules/user/types.ts";
import UserAvatar from "../components/user-avatar/script.ts";
import Component from "../../../../utils/component.ts";
import { PagesPath } from "../../../../pages-path.ts";
import { Connect } from "../../../../store/connect.ts";

class ViewInformation extends Component {
  constructor(props: SettingsUserType) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile("{{{ wrapper }}}", this.props);
  }
}

export default () =>
  SettingLayout({
    content: new (Connect(ViewInformation, (state) => ({
      user: state.user,
      wrapper: SettingsWrapper({
        avatar: UserAvatar(state.user && state.user.avatar),
        fields: USER_SETTING_FIELDS.map((filed) =>
          SettingsField({
            leftContent: filed.label,
            rightContent: (state.user && state.user[filed.name]) || "",
          }),
        ),
        actions: [
          SettingsField({
            leftContent: UiButton({
              label: "Изменить данные",
              variant: "link",
              onClick: () => new Router().go(PagesPath.CHANGE_USER_SETTING),
            }),
          }),

          SettingsField({
            leftContent: UiButton({
              label: "Изменить пароль",
              variant: "link",
              onClick: () => new Router().go(PagesPath.CHANGE_USER_PASSWORD),
            }),
          }),

          SettingsField({
            leftContent: LogOutBtn(),
          }),
        ],
      }),
    })))(),
  });
