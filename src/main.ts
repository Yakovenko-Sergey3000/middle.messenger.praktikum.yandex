import "./style.css";
import { LogOutBtn, ModuleSignIn, ModuleSignOut } from "@modules/auth/index.ts";
import { ModuleChat } from "@modules/chat/index.ts";
import {
  ModuleChangeUserInformation,
  ModuleChangeUserPassword,
  ModuleViewUserSetting,
} from "@modules/user/index.ts";
import { PagesPath } from "./pages-path.ts";
import Router from "./utils/router/index.ts";
import { isUserAuth, isUserNotAuth } from "./middleware/UserAuth.js";
import { USERS } from "./enums.js";

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
    .use(PagesPath.SIGN_IN, ModuleSignIn(), { middleware: [isUserAuth()] })
    .use(PagesPath.SING_OUT, ModuleSignOut(), { middleware: [isUserAuth()] })
    .use(PagesPath.HOME, ModuleChat(), { middleware: [isUserNotAuth()] })
    .use(PagesPath.USER_SETTING, ModuleViewUserSetting({ user: USERS[0], logOut: LogOutBtn }), {
      middleware: [isUserNotAuth()],
    })
    .use(PagesPath.CHANGE_USER_SETTING, ModuleChangeUserInformation(), {
      middleware: [isUserNotAuth()],
    })
    .use(PagesPath.CHANGE_USER_PASSWORD, ModuleChangeUserPassword(), {
      middleware: [isUserNotAuth()],
    })
    .use(`${PagesPath.CHAT}/:id`, ModuleChat(), {
      middleware: [isUserNotAuth()],
    })
    .start();
});
