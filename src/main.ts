import "./style.css";
import { ModuleSignIn, ModuleSignOut } from "@modules/auth/index.ts";
import { ModuleChat } from "@modules/chat/index.ts";
import {
  ModuleChangeUserInformation,
  ModuleChangeUserPassword,
  ModuleViewUserSetting,
} from "@modules/user/index.ts";
import { PagesPath } from "./pages-path.ts";
import Router from "./utils/router/index.js";

document.addEventListener("DOMContentLoaded", () => {
  // if (path.includes("500")) {
  //   renderComponent(
  //     "#app",
  //     LayoutErrorPage({
  //       title: "500",
  //       subtitle: "Мы уже фиксим",
  //       linkBackButton: UiButton({
  //         variant: "link",
  //         label: "Назад к чатам",
  //         onClick: () => window.location.replace(PagesPath.HOME),
  //       }),
  //     }),
  //   );
  // }

  new Router()
    .use(PagesPath.SIGN_IN, ModuleSignIn())
    .use(PagesPath.SING_OUT, ModuleSignOut())
    .use(PagesPath.HOME, ModuleChat())
    .use(PagesPath.USER_SETTING, ModuleViewUserSetting())
    .use(PagesPath.CHANGE_USER_SETTING, ModuleChangeUserInformation())
    .use(PagesPath.CHANGE_USER_PASSWORD, ModuleChangeUserPassword())
    .use("/chat/:id", ModuleChat())
    .start();
});
