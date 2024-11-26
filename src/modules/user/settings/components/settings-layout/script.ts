import "./styles.css";
import { UiButton } from "@ui/buttons/index.ts";
import template from "./template.hbs.ts";
import Component, { IComponent } from "../../../../../utils/component.ts";

type SettingLayoutType = {
  content: IComponent;
};

class SettingLayout extends Component {
  constructor(props: SettingLayoutType) {
    super("div", { ...props, attributes: { class: "user-settings" } });
    this.children.returnBackButton = UiButton({
      label: "←",
      variant: "circle",
      onClick: () => window.history.back(),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: SettingLayoutType) => new SettingLayout(props);
