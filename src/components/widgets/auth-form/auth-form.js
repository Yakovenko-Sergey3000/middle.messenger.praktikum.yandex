import "./auth-form.css";
import Handlebars from "handlebars";
import authForm from "./auth-form.tmlp.js";

const tmp = Handlebars.compile(authForm);
export default ({ content, title, className = "" }) => {
  Handlebars.registerPartial("content", content);

  return tmp({
    title,
    className,
  });
};