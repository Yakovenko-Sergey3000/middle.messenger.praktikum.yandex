import "./_404-500.css";
import Handlebars from "handlebars";
import { uiButtonLink } from "@ui/buttons/index.js";
import pageTemplate from "./_404-500.hbs.js";

export default ({ title, subtitle, href }: { title: string; subtitle: string; href: string }) => {
  Handlebars.registerPartial(
    "link_back_button",
    uiButtonLink({
      label: "Назад к чатам",
    }),
  );

  return Handlebars.compile(pageTemplate)({
    title,
    subtitle,
    href,
  });
};
