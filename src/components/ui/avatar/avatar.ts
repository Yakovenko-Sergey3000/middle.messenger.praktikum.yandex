import "./avatar.css";
import Handlebars from "handlebars";
import avatar from "./avatar.hbs.js";

export default () => Handlebars.compile(avatar)({});
