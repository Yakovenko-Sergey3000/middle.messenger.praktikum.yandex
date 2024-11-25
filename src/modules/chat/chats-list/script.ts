import "./styles.css";
import searchIcon from "@icons/search-icon.svg";
import rightArrow from "@icons/right-arrow_v1.svg";
import { UiButton } from "@ui/buttons/index.ts";
import ChatsActions from "@modules/chat/actions.js";
import { UiChatItem, UiChatItemType } from "@ui/chat-item/index.js";
import template from "./template.hbs.ts";
import Component from "../../../utils/component.ts";
import { PagesPath } from "../../../pages-path.ts";
import Router from "../../../utils/router/index.js";
import { Connect } from "../../../store/connect.js";
import SearchChatList from "./components/search-chat-list/script.js";

type ChatsListType = {
  chatsList: UiChatItemType[];
};
class ChatsList extends Component {
  constructor(props: ChatsListType) {
    super("div", {
      ...props,
      srcArrowHead: rightArrow,
      srcSearchIcon: searchIcon,
      isSearch: false,
    });

    this.children.openSettings = UiButton({
      className: "open-settings",
      label: "Профиль",
      variant: "link",
      onClick: () => {
        new Router().go(PagesPath.USER_SETTING);
      },
    });

    const searchChatBlock = SearchChatList({
      onClickItem: (data) => {
        searchChatBlock.setProps({ isLoading: true });
        new ChatsActions().addChat(data, () => {
          this.setProps({ isSearch: false });
          searchChatBlock.setProps({ isLoading: false });
        });
      },
    });

    const openSearchBtn = UiButton({
      label: "Найти пользователя",
      variant: "link",
      onClick: () => {
        const chatActions = new ChatsActions();

        if (!this.props.isSearch) {
          searchChatBlock.setProps({ isLoading: true });
          chatActions.searchUser("", () => {
            searchChatBlock.setProps({ isLoading: false });
          });
        } else {
          chatActions.clearSearchedUser();
        }

        this.setProps({ isSearch: !this.props.isSearch });
        openSearchBtn.setProps({
          label: this.props.isSearch ? "Назад к чатам" : "Найти пользователя",
        });
      },
    });

    this.children.searchUser = openSearchBtn;
    this.children.searchChatList = searchChatBlock;
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (chatsActions: ChatsActions) => {
  chatsActions.getChatsList();

  return new (Connect(ChatsList, (state) => ({
    chatsList: state.chatsList.map(
      (data) =>
        new UiChatItem({
          ...data,
          className: "dialogs_list__item",
          onClick: (chatId) => chatsActions.openChat(chatId),
        }),
    ),
  })))();
};
