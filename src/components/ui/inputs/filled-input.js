import "./inputs.css";
import Handlebars from "handlebars";
import input from "./flushed-input.tmpl.js";

const tmp = Handlebars.compile(input);
export default ({ type = "text", name, className = "" } = {}) =>
  tmp({
    className: `filled-input ${className}`,
    type,
    name,
  });
