import "./avatar.css";
import avatar from "./avatar.hbs";
import Handlebars from "handlebars";

export default () => Handlebars.compile(avatar)();
