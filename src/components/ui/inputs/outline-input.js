import "./inputs.css";
import Handlebars from "handlebars";
import outlineInput from "./input-outline.tmpl.js";

const tmp = Handlebars.compile(outlineInput);
export default ({ type = "text" } = {}) =>
  tmp({
    className: "flushed-input",
    type,
  });
