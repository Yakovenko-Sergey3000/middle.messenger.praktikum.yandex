import "./buttons.css";
import Handlebars from "handlebars";
import buttonTemplate from "@ui/buttons/button.hbs.js";

export default ({ label, type = "button", className = "" }) => Handlebars.compile(buttonTemplate)({
  type,
  className: `button-circle ${className}`,
  label,
});
