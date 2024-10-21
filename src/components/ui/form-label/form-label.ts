import "./form-label.css";
import Handlebars from "handlebars";
import formLabel from "./form-label.hbs.js";

export default ({ element, label, error, id }: any) => {
  Handlebars.registerPartial("element", element);
  return Handlebars.compile(formLabel)({
    label,
    error,
    id,
  });
};
