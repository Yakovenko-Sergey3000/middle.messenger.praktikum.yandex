import "./styles.css";
import { UiButton } from "@ui/buttons/index.ts";
import Router from "@utils/router/index.js";
import template from "./template.hbs.ts";
import Component, { IComponent } from "../../../../../utils/component.ts";

type SettingLayoutType = {
  content: IComponent;
};

class SettingLayout extends Component {
  constructor(props: SettingLayoutType) {
    super("div", props);
    this.children.returnBackButton = UiButton({
      label: "←",
      variant: "circle",
      onClick: () => new Router().back(),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: SettingLayoutType) => new SettingLayout(props);
