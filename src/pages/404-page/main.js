import "@global-style";
import { widgetNotFoundPage } from "@widgets/_404-500/index.js";

document.querySelector("#app").innerHTML = widgetNotFoundPage({
  title: "404",
  subtitle: "Не туда попали",
  href: "/",
});
