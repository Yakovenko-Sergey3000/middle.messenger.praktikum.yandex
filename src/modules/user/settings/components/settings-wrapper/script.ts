import "./styles.css";
import Component, { IComponent } from "@utils/component.ts";
import template from "./template.hbs.ts";

type SettingsWrapperType = {
  avatar: IComponent;
  fields?: IComponent[];
  actions?: IComponent[];
  saveButton?: IComponent;
};

class SettingsWrapper extends Component {
  constructor(props: SettingsWrapperType) {
    super("div", { ...props, attributes: { class: "setting-wrapper" } });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: SettingsWrapperType) => new SettingsWrapper(props);
