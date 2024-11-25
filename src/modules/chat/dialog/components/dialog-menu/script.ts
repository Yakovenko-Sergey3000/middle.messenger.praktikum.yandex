import "./sctyle.css";
import Component from "@utils/component.js";
import { UiButton } from "@ui/buttons/index.js";
import ChatsActions from "@modules/chat/actions.js";
import template from "./template.hbs.js";

class DialogMenu extends Component {
  constructor() {
    super("div", {
      attributes: { class: "dialog-menu" },
      isOpen: false,
      dialogList: [
        UiButton({
          label: "Удалить диалог",
          variant: "link",
          className: "dialog-menu__delete-btn",
          onClick: () => {
            new ChatsActions().deleteChat();
          },
        }),
      ],
      onClick: () => {
        this.setProps({ isOpen: !this.props.isOpen });
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default () => new DialogMenu();
