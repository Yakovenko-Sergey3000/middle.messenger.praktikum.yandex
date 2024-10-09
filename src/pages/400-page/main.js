import "@global-style";
import { widgetNotFoundPage } from "@widgets/_400-500/index.js";

document.querySelector("#app").innerHTML = widgetNotFoundPage({
  title: "400",
  subtitle: "Не туда попали",
  href: "/",
});
