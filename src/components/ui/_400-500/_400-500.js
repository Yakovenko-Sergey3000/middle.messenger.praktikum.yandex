import "./_400-500.css";
import Handlebars from "handlebars";
import pageTemplate from "./_400-500.tmpl.js";
import { uiButtonLink } from "@ui/buttons/index.js";

const tmp = Handlebars.compile(pageTemplate);

Handlebars.registerPartial(
  "link_button",
  uiButtonLink({
    label: "Назад к чатам",
  }),
);

export default ({ title, subtitle, href } = {}) =>
  tmp({
    title,
    subtitle,
    href,
  });
