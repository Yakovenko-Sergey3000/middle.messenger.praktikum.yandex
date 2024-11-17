import "./style.css";
import Component from "@utils/component.ts";
import { UiInput } from "@ui/inputs/index.js";
import { UiAvatar } from "@ui/avatar/index.js";
import UserActions from "@modules/user/actions.js";
import template from "./template.hbs.ts";

type ChangeUserAvatarType = {
  src: string | null;
};
class ChangeUserAvatar extends Component {
  constructor(props: ChangeUserAvatarType) {
    super("div", {
      attributes: { class: "change-avatar" },
      wrapperText: props.src ? "Изменить аватар" : "Добавить аватар",
    });
    const userActions = new UserActions();

    this.children.avatar = UiAvatar({
      width: "130px",
      height: "130px",
      src: props.src,
      variant: "circle",
      alt: "Avatar",
      className: "user_avatar",
    });

    this.children.input = UiInput({
      attributes: { type: "file", id: "change-avatar", accept: "image/*" },
      onInput: (e) => {
        const target = e.target as HTMLInputElement;

        if (target.files && target.files.length) {
          userActions.changeAvatar(target.files[0]);
        }
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: ChangeUserAvatarType) => new ChangeUserAvatar(props);
