import "./styles.css";
import template from "./template.hbs.js";
import Component, { IComponent } from "../../../utils/component.js";

type LayoutChatType = {
  chatsList: IComponent;
  chatDialog: IComponent;
};
class LayoutChat extends Component {
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: LayoutChatType) => new LayoutChat("div", props);
