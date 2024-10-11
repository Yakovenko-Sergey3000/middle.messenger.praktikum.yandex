import "./auth-form.css";
import Handlebars from "handlebars";
import authForm from "./auth-form.hbs";
export default ({ content, title, className = "" }) => {
  Handlebars.registerPartial("content", content);

  return Handlebars.compile(authForm)({
    title,
    className,
  });
};
