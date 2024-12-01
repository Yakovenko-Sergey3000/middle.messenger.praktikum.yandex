import "./styles.css";
import Component, { IComponent } from "@utils/component.ts";
import { ComponentEventsType, ComponentType } from "@utils/global-types/index.ts";
import ConcatClasses from "@utils/concat-classes.ts";

type UiButtonType = ComponentType &
  ComponentEventsType & {
    label: string;
    className?: string;
    variant?: "main" | "link" | "circle";
    isLoading?: boolean;
  };
class UiButton extends Component {
  componentDidUpdate(_: IComponent, newState: IComponent): boolean {
    if ("isLoading" in newState) {
      if (newState.isLoading) {
        this.getContent().setAttribute("disabled", "");
      } else {
        this.getContent().removeAttribute("disabled");
      }
    }

    return true;
  }

  render(): DocumentFragment {
    const { label = "" } = this.props;

    return this.compile(`${this.props.isLoading ? "Загрузка..." : label}`, this.props);
  }
}

export default (props: UiButtonType) =>
  new UiButton("button", {
    ...props,
    attributes: {
      ...props.attributes,
      class: ConcatClasses(
        { main: "button", link: "button-link", circle: "button-circle" }[props.variant || "main"],
        props.className,
      ),
    },
  });
