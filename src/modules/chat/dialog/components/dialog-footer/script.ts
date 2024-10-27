import "./styles.css";
import { UiInput } from "@ui/inputs/index.ts";
import { UiButton } from "@ui/buttons/index.ts";
import sctFileIcon from "@icons/add-file-icon.svg";
import template from "./tamplate.hbs.ts";
import Component from "../../../../../utils/component.ts";
import { ComponentType } from "../../../../../utils/global-types/index.ts";
import ConcatClasses from "../../../../../utils/concat-classes.ts";

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
