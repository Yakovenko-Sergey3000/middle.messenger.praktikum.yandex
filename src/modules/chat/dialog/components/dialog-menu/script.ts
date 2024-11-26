import "./sctyle.css";
import Component from "@utils/component.ts";
import { UiButton } from "@ui/buttons/index.ts";
import ChatsActions from "@modules/chat/actions.ts";
import template from "./template.hbs.ts";

type DialogMenuType = { openModalAddUserToChat: () => void };
class DialogMenu extends Component {
  constructor(props: DialogMenuType) {
    super("div", {
      attributes: { class: "dialog-menu" },
      isOpen: false,
      onClick: () => {
        this.setProps({ isOpen: !this.props.isOpen });
      },
    });
    const chatActions = new ChatsActions();

    this.listChildren.dialogList = [
      UiButton({
        label: "Добавить пользователя",
        variant: "link",
        onClick: () => {
          chatActions.searchUser();
          props.openModalAddUserToChat();
        },
      }),
      UiButton({
        label: "Удалить диалог",
        variant: "link",
        className: "dialog-menu__delete-btn",
        onClick: () => {
          chatActions.deleteChat();
        },
      }),
    ];
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: DialogMenuType) => new DialogMenu(props);
