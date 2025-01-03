import "./styles.css";

import template from "./template.hbs.ts";
import Component, { IComponent } from "../../../utils/component.ts";

type ErrorPageType = {
  title: string;
  subtitle: string;
  linkBackButton: IComponent;
};

class ErrorPage extends Component {
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: ErrorPageType) =>
  new ErrorPage("div", { ...props, attributes: { class: "_400-500-wrapper" } });
