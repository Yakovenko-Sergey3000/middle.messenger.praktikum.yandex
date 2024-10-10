import "@global-style";
import { layoutNotFoundPage } from "@layouts/_404-500/index.js";

document.querySelector("#app").innerHTML = layoutNotFoundPage({
  title: "404",
  subtitle: "Не туда попали",
  href: "/",
});
