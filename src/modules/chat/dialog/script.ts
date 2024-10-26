import "./styles.css";
import { UiAvatar } from "@ui/avatar/index.js";
import template from "./template.hbs.js";
import Component from "../../../utils/component.js";
import DialogFooter from "./components/dialog-footer/script.js";
import MessageItem from "./components/message-item/script.js";

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
      userName: "Вадим",
      messages: [MessageItem({ message: MOCK_TEXT })],
    });

    this.children.dialogAvatar = UiAvatar({
      width: "54px",
      height: "54px",
      alt: "Avatar",
      src: "https://gp.by/upload/dcf/dcf54a64c040dae4be0f65c1b77e918a.jpg",
      className: "dialog-avatar",
    });

    this.children.footer = DialogFooter({
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
        this.setProps({
          messages: [
            ...this.listChildren.messages,
            MessageItem({ message: data.message as string, className: "left" }),
          ],
        });

        console.log(data);

        target.reset();
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default () => new Dialog();
