import "./buttons.css";
import Handlebars from "handlebars";
import buttonTemplate from "@ui/buttons/button.tmpl.js";

const tmp = Handlebars.compile(buttonTemplate);
export default ({ label, type = "button", className = "" }) =>
  tmp({
    type,
    className: `button ${className}`,
    label,
  });
