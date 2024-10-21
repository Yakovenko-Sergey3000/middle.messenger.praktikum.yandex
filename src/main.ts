import "./style.css";
import { layoutNotFoundPage } from "@layouts/_404-500/index.js";
import {
  moduleChangeUserInformation,
  moduleChangeUserPassword,
  moduleViewUserSetting,
} from "@modules/user/index.js";
import { moduleChat } from "@modules/chat/index.js";
import { moduleSignIn, moduleSignOut } from "@modules/auth/index.js";
const app: any = document.querySelector("#app");

const renderPage = (el: string) => {
  app.innerHTML = el;
};

const path = window.location.pathname;

if (path.includes("404")) {
  renderPage(
    layoutNotFoundPage({
      title: "404",
      subtitle: "Не туда попали",
      href: "/",
    }),
  );
}

if (path.includes("500")) {
  renderPage(
    layoutNotFoundPage({
      title: "500",
      subtitle: "Мы уже фиксим",
      href: "/",
    }),
  );
}

if (path.includes("change-user-information")) {
  renderPage(moduleChangeUserInformation());
}

if (path.includes("change-user-password")) {
  renderPage(moduleChangeUserPassword());
}

if (path.includes("chat")) {
  renderPage(moduleChat());
}

if (path.includes("sign-in-page")) {
  renderPage(moduleSignIn());
}

if (path.includes("sign-out-page")) {
  renderPage(moduleSignOut());
}

if (path.includes("view-user-settings")) {
  renderPage(moduleViewUserSetting());
}
