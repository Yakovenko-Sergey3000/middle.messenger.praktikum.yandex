import "./styles.css";
import { UiInput } from "@ui/inputs/index.js";
import { UiButton } from "@ui/buttons/index.js";
import sctFileIcon from "@icons/add-file-icon.svg";
import template from "./tamplate.hbs.js";
import Component from "../../../../../utils/component.js";
import { ComponentType } from "../../../../../utils/global-types/index.js";
import ConcatClasses from "../../../../../utils/concat-classes.js";

type DialogFooterType = ComponentType & {
  onSubmit?: (e: Event) => void;
};
class DialogFooter extends Component {
  constructor(props: DialogFooterType) {
    super("form", {
      attributes: { class: ConcatClasses(props.className) },
      sctFileIcon,
      onSubmit: (e: FormDataEvent) => props.onSubmit && props.onSubmit(e),
    });

    this.children.messageInput = UiInput({
      className: "send-message-input",
      attributes: { name: "message", placeholder: "Сообщение" },
    });

    this.children.sendMessageButton = UiButton({
      label: "➔",
      variant: "circle",
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (pros: DialogFooterType) => new DialogFooter(pros);
