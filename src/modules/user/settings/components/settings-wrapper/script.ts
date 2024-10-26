import "./styles.css";
import { UiAvatar } from "@ui/avatar/index.js";
import Component, { IComponent } from "../../../../../utils/component.js";
import template from "./template.hbs.js";
import { UserType } from "../../../../../utils/global-types/index.js";

type SettingsWrapperType = {
  user: UserType;
  fields?: IComponent[];
  actions?: IComponent[];
  saveButton?: IComponent;
};
class SettingsWrapper extends Component {
  constructor(props: SettingsWrapperType) {
    super("div", { ...props, attributes: { class: "setting-wrapper" } });
    this.children.avatar = UiAvatar({
      width: "130px",
      height: "130px",
      src: props.user.avatar,
      alt: "Avatar",
      className: "user_avatar",
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: SettingsWrapperType) => new SettingsWrapper(props);