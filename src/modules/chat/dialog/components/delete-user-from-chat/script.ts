import "./style.css";
import Component from "@utils/component.ts";
import { UiUserItem } from "@ui/user-item/index.ts";
import { UiUserItemType } from "@ui/user-item/script.ts";
import { UserType } from "@utils/global-types/index.ts";
import { Connect } from "../../../../../store/connect.ts";
import template from "./template.hbs.ts";

class DeleteUserFromChat extends Component {
  constructor() {
    super("div", { attributes: { class: "delete-user" } });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: { onClickItem: (user: UserType) => void }) =>
  new (Connect(DeleteUserFromChat, (state) => ({
    list: state.usersInChat.map((user) =>
      UiUserItem({
        ...(user as UiUserItemType),
        onClick: () => {
          props.onClickItem(user);
        },
      }),
    ),
  })))();
