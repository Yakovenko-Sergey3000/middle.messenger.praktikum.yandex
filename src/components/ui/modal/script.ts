import "./style.css";
import Component, { IComponent } from "@utils/component.js";
import template from "./template.hbs.js";

type UiModalType = {
  content: IComponent;
};
class UiModal extends Component {
  constructor(props: UiModalType) {
    super("div", { ...props, isOpen: false });
  }

  onOpen() {
    this.setProps({ isOpen: true });
  }

  onClose() {
    this.setProps({ isOpen: false });
  }

  componentDidReRender() {
    const overlay = document.querySelector(".modal__overlay");
    overlay?.addEventListener("click", () => {
      this.onClose();
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: UiModalType) => new UiModal(props);
