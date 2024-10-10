import "./inputs.css";
import Handlebars from "handlebars";
import input from "./flushed-input.hbs";
export default ({
  type = "text",
  name,
  className = "",
  placeholder = "",
} = {}) =>
  Handlebars.compile(input)({
    className: `filled-input ${className}`,
    type,
    name,
    placeholder,
  });
