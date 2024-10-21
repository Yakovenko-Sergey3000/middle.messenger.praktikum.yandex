import "./inputs.css";
import Handlebars from "handlebars";
import input from "./flushed-input.hbs.js";
export default ({
  type = "text",
  name,
  className = "",
  placeholder = "",
  value = "",
  id = "",
}) =>
  Handlebars.compile(input)({
    className: `filled-input ${className}`,
    type,
    name,
    placeholder,
    value,
    id,
  });
