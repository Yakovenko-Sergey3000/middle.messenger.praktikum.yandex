import "./styles.css";
import { UiAvatar } from "@ui/avatar/index.ts";
import Router from "@utils/router/index.js";
import ChatsListActions from "@modules/chat/actions.js";
import template from "./template.hbs.ts";
import Component from "../../../utils/component.ts";
import DialogFooter from "./components/dialog-footer/script.ts";
import MessageItem from "./components/message-item/script.ts";
import { Connect } from "../../../store/connect.js";

const MOCK_TEXT = `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в 
какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все 
знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще
 находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так 
никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе 
за 45000 евро.`;

class Dialog extends Component {
  constructor() {
    super("div", {
      attributes: { class: "dialog" },
    });
  }

  componentDidMount() {
    const action = new ChatsListActions();
    const splitPath = new Router().atPath.split("/");
    const currentChatId = splitPath[splitPath.length - 1];

    action.openChat(Number(currentChatId));
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default () => {
  const DialogWithState = Connect(Dialog, (state) => {
    console.log(state);
    return {
      dialogAvatar: UiAvatar({
        width: "54px",
        height: "54px",
        alt: "Avatar",
        src: "",
        className: "dialog-avatar",
      }),
      userName: "Вадим",
      messages: [MessageItem({ message: MOCK_TEXT })],
      footer: DialogFooter({
        className: "footer",
        onSubmit: (e: Event) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const fd: FormData = new FormData(target);
          const data: Record<string, FormDataEntryValue> = {};

          fd.forEach((val, key) => {
            data[key] = val;
          });

          if (!data.message) {
            console.log("Сообщение не оправлено!");
            return;
          }

          console.log(data);

          target.reset();
        },
      }),
    };
  });

  return new DialogWithState();
};
