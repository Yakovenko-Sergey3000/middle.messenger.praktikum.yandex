import "./style.css";
import { ModuleSignIn, ModuleSignOut } from "@modules/auth/index.ts";
import { ModuleChat } from "@modules/chat/index.ts";
import {
  ModuleChangeUserInformation,
  ModuleChangeUserPassword,
  ModuleViewUserSetting,
} from "@modules/user/index.ts";
import AuthActions from "@modules/auth/actions.js";
import { NotFound } from "@utils/router/NotFound.js";
import { PagesPath } from "./pages-path.ts";
import Router from "./utils/router/index.ts";
import store, { StoreEvent } from "./store/store.js";

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

  const authAction = new AuthActions();
  const init = () => {
    const router = new Router();
    if (authAction.isAuth()) {
      router
        .use(PagesPath.HOME, new ModuleChat())
        .use(PagesPath.USER_SETTING, ModuleViewUserSetting())
        .use(PagesPath.CHANGE_USER_SETTING, ModuleChangeUserInformation())
        .use(PagesPath.CHANGE_USER_PASSWORD, ModuleChangeUserPassword())
        .notFound(
          NotFound(() => {
            router.go(PagesPath.HOME);
          }),
        );
    } else {
      router
        .use(PagesPath.SIGN_IN, ModuleSignIn())
        .use(PagesPath.SING_OUT, ModuleSignOut())
        .notFound(() => router.go(PagesPath.SIGN_IN));
    }

    router.start();
    store.off(StoreEvent.Update, init);
  };

  authAction.getUser();
  store.on(StoreEvent.Update, init);
});
