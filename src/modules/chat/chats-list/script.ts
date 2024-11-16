import "./styles.css";
import searchIcon from "@icons/search-icon.svg";
import rightArrow from "@icons/right-arrow_v1.svg";
import { UiInput } from "@ui/inputs/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import ChatsListActions from "@modules/chat/chats-list/actions.js";
import { UiChatItem } from "@ui/chat-item/index.js";
import template from "./template.hbs.ts";
import Component from "../../../utils/component.ts";
import { PagesPath } from "../../../pages-path.ts";
import Router from "../../../utils/router/index.js";
import { Connect } from "../../../store/connect.js";

class ChatsList extends Component {
  constructor() {
    super("div", {
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

    this.children.searchInput = UiInput({
      attributes: { placeholder: "Поиск" },
      className: "search-input",
    });
  }

  componentDidMount() {
    new ChatsListActions().getChatsList();
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Connect(ChatsList, (state) => ({
  chatsList: state.chatsList.map(
    (data) =>
      new UiChatItem({
        ...data,
        className: "dialogs_list__item",
        onClick: (chatId) => {
          const chatsListAction = new ChatsListActions();
          chatsListAction.getChatToken(chatId, (token) => {
            new Router().go(`${PagesPath.CHAT}/${token}`);
          });
        },
      }),
  ),
}));
