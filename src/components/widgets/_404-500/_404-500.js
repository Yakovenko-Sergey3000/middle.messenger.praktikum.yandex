import "./_404-500.css";
import Handlebars from "handlebars";
import pageTemplate from "./_404-500.hbs";
import { uiButtonLink } from "@ui/buttons/index.js";

Handlebars.registerPartial(
  "link_button",
  uiButtonLink({
    label: "Назад к чатам",
  }),
);

export default ({ title, subtitle, href } = {}) =>
  Handlebars.compile(pageTemplate)({
    title,
    subtitle,
    href,
  });
