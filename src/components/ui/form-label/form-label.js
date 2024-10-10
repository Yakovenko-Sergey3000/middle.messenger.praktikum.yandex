import "./form-label.css";
import Handlebars from "handlebars";
import formLabel from "./form-label.tmpl.js";

const tmp = Handlebars.compile(formLabel);

export default ({ element, label, error } = {}) => {
  Handlebars.registerPartial("element", element);
  return tmp({
    label,
    error,
  });
};
