import "./buttons.css";
import Handlebars from "handlebars";
import buttonTemplate from "@ui/buttons/button.hbs";
export default ({ label, type = "button", className = "" }) =>
  Handlebars.compile(buttonTemplate)({
    type,
    className: `button ${className}`,
    label,
  });
