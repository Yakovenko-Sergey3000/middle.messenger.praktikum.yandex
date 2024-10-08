import "./inputs.css";
import Handlebars from "handlebars";
import outlineInput from "./input-outline.tmpl.js";

const tmp = Handlebars.compile(outlineInput);
export default ({ type = "text", name, className = "" } = {}) =>
  tmp({
    className: `flushed-input ${className}`,
    type,
    name,
  });
