import "./style.css";
import { ModuleSignIn, ModuleSignOut } from "@modules/auth/index.js";
import { ModuleChat } from "@modules/chat/index.js";
import {
  ModuleChangeUserInformation,
  ModuleChangeUserPassword,
  ModuleViewUserSetting,
} from "@modules/user/index.js";
import { LayoutErrorPage } from "@layouts/_404-500/index.js";
import { UiButton } from "@ui/buttons/index.js";
import { renderComponent } from "./utils/rende-component.js";
import { PagesPath } from "./pages-path.js";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("404")) {
    renderComponent(
      "#app",
      LayoutErrorPage({
        title: "404",
        subtitle: "Не туда попали",
        linkBackButton: UiButton({
          variant: "link",
          label: "Назад к чатам",
          onClick: () => window.location.replace(PagesPath.HOME),
        }),
      }),
    );
  }

  if (path.includes("500")) {
    renderComponent(
      "#app",
      LayoutErrorPage({
        title: "500",
        subtitle: "Мы уже фиксим",
        linkBackButton: UiButton({
          variant: "link",
          label: "Назад к чатам",
          onClick: () => window.location.replace(PagesPath.HOME),
        }),
      }),
    );
  }

  if (path.includes("change-user-information")) {
    renderComponent("#app", ModuleChangeUserInformation());
  }

  if (path.includes("change-user-password")) {
    renderComponent("#app", ModuleChangeUserPassword());
  }

  if (path.includes("chat")) {
    renderComponent("#app", ModuleChat());
  }

  if (path.includes("sign-in-page")) {
    renderComponent("#app", ModuleSignIn());
  }

  if (path.includes("sign-out-page")) {
    renderComponent("#app", ModuleSignOut());
  }

  if (path.includes("view-user-settings")) {
    renderComponent("#app", ModuleViewUserSetting());
  }
});
