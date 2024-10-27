import "./styles.css";
import template from "./template.hbs.ts";
import Component, { IComponent } from "../../../utils/component.ts";

type AuthFormLayoutType = {
  title: string;
  content: IComponent;
  onSubmit?: (e: Event) => void;
};

class AuthFormLayout extends Component {
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (props: AuthFormLayoutType) =>
  new AuthFormLayout("form", { ...props, attributes: { class: "auth", novalidate: true } });
