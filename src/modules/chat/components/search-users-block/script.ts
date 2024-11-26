import "./style.css";
import Component from "@utils/component.ts";
import ChatsActions from "@modules/chat/actions.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { UiInput } from "@ui/inputs/index.ts";
import { UiUserItem } from "@ui/user-item/index.ts";
import { UiUserItemType } from "@ui/user-item/script.ts";
import template from "./template.hts.ts";
import { Connect } from "../../../../store/connect.ts";

type SearchChatListType = {
  onClickItem: (data: UiUserItemType) => void;
};

class SearchChatList extends Component {
  constructor() {
    super("form", {
      onSubmit: (e: Event) => {
        e.preventDefault();
        this.children.btn.setProps({ isLoading: true });
        this.setProps({ isLoading: true });

        const chatActions = new ChatsActions();
        const target = e.target as HTMLFormElement;
        const fd: FormData = new FormData(target);
        const login = fd.get("login") as string;

        chatActions.searchUser(login, () => {
          this.children.btn.setProps({ isLoading: false });
          this.setProps({ isLoading: false });
        });
      },
    });

    this.children.input = UiInput({
      attributes: { placeholder: "Введите логин пользователя", name: "login" },
    });
    this.children.btn = UiButton({
      label: "Найти",
      attributes: { type: "submit" },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ({ onClickItem }: SearchChatListType) =>
  new (Connect(SearchChatList, (state) => ({
    userList: state.searchUserList.map((data) =>
      UiUserItem({
        ...data,
        onClick: () => onClickItem(data),
      }),
    ),
  })))();
