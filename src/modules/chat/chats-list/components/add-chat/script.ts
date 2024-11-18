import Component from "@utils/component.ts";
import ChatsActions from "@modules/chat/actions.ts";
import { UiButton } from "@ui/buttons/index.ts";
import { UiInput } from "@ui/inputs/index.ts";
import template from "./template.hts.ts";
import "./style.css";

class AddChat extends Component {
  constructor() {
    super("div", {
      isOpen: false,
    });
    const chatActions = new ChatsActions();
    const input = UiInput({
      attributes: { placeholder: "Введите логин пользователя" },
    });

    this.children.input = input;

    this.children.btn = UiButton({
      label: "Добавить",
      onClick: () => {
        const element = input.getContent() as HTMLInputElement;

        chatActions.addChat(
          element.value,
          () => {
            element.value = "";
            this.setProps({ isOpen: false });
          },
          () => {},
        );
      },
    });

    this.children.openBtn = UiButton({
      label: "Добавить диалог",
      onClick: () => this.setProps({ isOpen: true }),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default () => new AddChat();
