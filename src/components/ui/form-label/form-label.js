import "./form-label.css";
import Handlebars from "handlebars";
import formLabel from "./form-label.hbs";

export default ({ element, label, error, id } = {}) => {
  Handlebars.registerPartial("element", element);
  return Handlebars.compile(formLabel)({
    label,
    error,
    id,
  });
};
