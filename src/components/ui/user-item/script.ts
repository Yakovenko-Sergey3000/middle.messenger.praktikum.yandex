import "./style.css";
import Component from "@utils/component.js";
import { UiAvatar } from "@ui/avatar/index.js";
import template from "./template.hbs.js";

export type UiUserItemType = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

class UiUserItem extends Component {
  constructor(props: UiUserItemType) {
    super("div", {
      ...props,
      avatar: UiAvatar({
        width: "47px",
        height: "47px",
        src: props.avatar || "",
        alt: "Avatar",
        variant: "circle",
      }),
      title: props.display_name || props.login,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: UiUserItemType & { onClick: (data: UiUserItemType) => void }) =>
  new UiUserItem(props);
