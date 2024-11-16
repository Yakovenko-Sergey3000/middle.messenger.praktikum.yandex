import "./styles.css";
import template from "./template.hbs.ts";
import Component, { IComponent } from "../../../utils/component.ts";

type LayoutChatType = {
  chatsList: IComponent;
  chatDialog: IComponent | undefined;
};

class LayoutChat extends Component {
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: LayoutChatType) => new LayoutChat("div", props);
