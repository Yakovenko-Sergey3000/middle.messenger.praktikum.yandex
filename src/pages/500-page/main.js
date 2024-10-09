import "@global-style";
import { widgetNotFoundPage } from "@widgets/_400-500/index.js";

document.querySelector("#app").innerHTML = widgetNotFoundPage({
  title: "500",
  subtitle: "Мы уже фиксим",
  href: "/",
});
