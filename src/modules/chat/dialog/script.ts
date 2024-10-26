import "./styles.css";
import { UiAvatar } from "@ui/avatar/index.js";
import template from "./template.hbs.js";
import Component from "../../../utils/component.js";
import DialogFooter from "./components/dialog-footer/script.js";

class Dialog extends Component {
  constructor() {
    super("div", {
      attributes: { class: "dialog" },
      userName: "Вадим",
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
