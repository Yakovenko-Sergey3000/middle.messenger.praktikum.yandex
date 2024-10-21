import "./avatar.css";
import avatar from "./avatar.hbs.js";
import Handlebars from "handlebars";

export default () => Handlebars.compile(avatar)({});
