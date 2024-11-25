import Component from "@utils/component.ts";
import ChatsActions from "@modules/chat/actions.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { UiInput } from "@ui/inputs/index.ts";
import { UiUserItem } from "@ui/user-item/index.js";
import { UiUserItemType } from "@ui/user-item/script.js";
import template from "./template.hts.ts";
import "./style.css";
import { Connect } from "../../../../../store/connect.js";

type SearchChatListType = {
  onClickItem: (data: UiUserItemType) => void;
};

class SearchChatList extends Component {
  constructor() {
    super("div");
    const chatActions = new ChatsActions();

    const input = UiInput({
      attributes: { placeholder: "Введите логин пользователя" },
    });

    const btn = UiButton({
      label: "Найти",
      onClick: () => {
        const element = input.getContent() as HTMLInputElement;
        btn.setProps({ isLoading: true });
        this.setProps({ isLoading: true });
        element.disabled = true;
        chatActions.searchUser(element.value, () => {
          btn.setProps({ isLoading: false });
          this.setProps({ isLoading: false });
          element.value = "";
          element.disabled = false;
        });
      },
    });

    this.children.input = input;
    this.children.btn = btn;
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
