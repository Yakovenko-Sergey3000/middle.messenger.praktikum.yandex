import "./styles.css";
import searchIcon from "@icons/search-icon.svg";
import rightArrow from "@icons/right-arrow_v1.svg";
import { UiInput } from "@ui/inputs/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import ChatsActions from "@modules/chat/actions.js";
import { UiChatItem, UiChatItemType } from "@ui/chat-item/index.js";
import template from "./template.hbs.ts";
import Component from "../../../utils/component.ts";
import { PagesPath } from "../../../pages-path.ts";
import Router from "../../../utils/router/index.js";
import { Connect } from "../../../store/connect.js";
import AddChat from "./components/add-chat/script.ts";

type ChatsListType = {
  chatsList: UiChatItemType[];
};
class ChatsList extends Component {
  constructor(props: ChatsListType) {
    super("div", {
      ...props,
      srcArrowHead: rightArrow,
      srcSearchIcon: searchIcon,
    });

    this.children.openSettings = UiButton({
      className: "open-settings",
      label: "Профиль",
      variant: "link",
      onClick: () => {
        new Router().go(PagesPath.USER_SETTING);
      },
    });

    this.children.addChat = AddChat();

    this.children.searchInput = UiInput({
      attributes: { placeholder: "Поиск" },
      className: "search-input",
    });
  }

  componentDidMount() {
    new ChatsActions().getChatsList();
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default () => {
  const chatsActions = new ChatsActions();

  const ChatsListWithState = Connect(ChatsList, (state) => ({
    chatsList: state.chatsList.map(
      (data) =>
        new UiChatItem({
          ...data,
          className: "dialogs_list__item",
          onClick: (chatId) => chatsActions.openChat(chatId),
        }),
    ),
  }));

  return new ChatsListWithState();
};
