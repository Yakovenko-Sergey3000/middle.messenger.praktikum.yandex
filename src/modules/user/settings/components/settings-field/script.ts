import "./styles.css";
import template from "./template.hbs.ts";
import Component, { IComponent } from "../../../../../utils/component.ts";

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
