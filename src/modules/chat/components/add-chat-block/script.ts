import "./style.css";
import Component from "@utils/component.ts";
import { UiInput } from "@ui/inputs/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import ChatsActions from "@modules/chat/actions.ts";
import template from "./template.hbs.ts";

type AddChatBlockType = {
  closeModal: () => void;
};
class AddChatBlock extends Component {
  constructor(props: AddChatBlockType) {
    super("form", {
      attributes: { class: "add-chat" },
      onSubmit: (e: Event) => {
        e.preventDefault();
        const chatActions = new ChatsActions();

        const target = e.target as HTMLFormElement;
        const fd: FormData = new FormData(target);

        const title = fd.get("title");
        this.children.btn.setProps({ isLoading: true });

        if (title) {
          chatActions.createChat(title as string, () => {
            this.children.btn.setProps({ isLoading: false });
            target.reset();
            props.closeModal();
          });
        }
      },
    });

    this.children.input = UiInput({
      attributes: {
        placeholder: "Введите название чата...",
        name: "title",
      },
      variant: "flushed",
    });

    this.children.btn = UiButton({
      label: "Создать",
      attributes: { type: "submit" },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: AddChatBlockType) => new AddChatBlock(props);
