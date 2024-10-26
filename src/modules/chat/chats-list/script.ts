import "./styles.css";
import searchIcon from "@icons/search-icon.svg";
import rightArrow from "@icons/right-arrow_v1.svg";
import { chatsList as mockChatsList } from "@modules/chat/chats-list/mock-messages-data.js";
import { UiInput } from "@ui/inputs/index.js";
import { UiButton } from "@ui/buttons/index.js";
import { UiChatItem } from "@ui/chat-item/index.js";
import template from "./template.hbs.js";
import Component from "../../../utils/component.js";
import { PagesPath } from "../../../pages-path.js";

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
        window.location.replace(PagesPath.USER_SETTING);
      },
    });

    this.children.searchInput = UiInput({
      attributes: { placeholder: "Поиск" },
      className: "search-input",
    });
  }

  componentDidMount() {
    const list = mockChatsList;
    this.setProps({
      chatsList: list.map((data) =>
        UiChatItem({
          ...data,
          className: "dialogs_list__item",
          onClick: (chatId) => {
            console.log(chatId);
          },
        }),
      ),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default () => new ChatsList();
