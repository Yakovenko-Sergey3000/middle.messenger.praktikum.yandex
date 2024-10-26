import Component, { IComponent } from "../../../utils/component.js";

type UiFormType = {
  content: IComponent;
  onSubmit: (e: Event) => void;
};
class UiForm extends Component {
  render(): DocumentFragment {
    return this.compile("{{{ content }}}", this.props);
  }
}

export default (props: UiFormType) => new UiForm("form", props);
