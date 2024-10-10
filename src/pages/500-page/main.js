import "@global-style";
import { layoutNotFoundPage } from "@layouts/_404-500/index.js";

document.querySelector("#app").innerHTML = layoutNotFoundPage({
  title: "500",
  subtitle: "Мы уже фиксим",
  href: "/",
});
