import "@global-style";
import { uiNotFoundPage } from "@ui/_400-500/index.js";

document.querySelector("#app").innerHTML = uiNotFoundPage({
  title: "500",
  subtitle: "Мы уже фиксим",
  href: "/",
});
