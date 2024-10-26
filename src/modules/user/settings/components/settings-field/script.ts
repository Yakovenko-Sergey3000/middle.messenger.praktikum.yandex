import "./styles.css";
import template from "./template.hbs.js";
import Component, { IComponent } from "../../../../../utils/component.js";

type SettingsFieldType = {
  leftContent?: string | number | IComponent;
  rightContent?: string | number | IComponent;
  error?: string;
};
class SettingsField extends Component {
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: SettingsFieldType) => new SettingsField("div", props);
