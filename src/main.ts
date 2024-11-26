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
import { ModuleDialog } from "@modules/chat/dialog/index.js";
import { PagesPath } from "./pages-path.ts";
import Router from "./utils/router/index.ts";

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
  //         onClick: () => window.location.replace(PagesPath.MESSENGER),
  //       }),
  //     }),
  //   );
  // }

  const authAction = new AuthActions();
  const router = new Router();

  authAction
    .getUser()
    .then((user) => {
      authAction.setUser(user);

      router
        .use(PagesPath.MESSENGER, ModuleChat())
        .use(PagesPath.USER_SETTING, ModuleViewUserSetting())
        .use(PagesPath.CHANGE_USER_SETTING, ModuleChangeUserInformation())
        .use(PagesPath.CHANGE_USER_PASSWORD, ModuleChangeUserPassword())
        .use(
          `${PagesPath.MESSENGER}/:id`,
          ModuleChat((props) => ModuleDialog(props)),
        )
        .notFound(
          NotFound(() => {
            router.go(PagesPath.MESSENGER);
          }),
        );
    })
    .catch(() => {
      router
        .use(PagesPath.SIGN_IN, ModuleSignIn())
        .use(PagesPath.SING_OUT, ModuleSignOut())
        .notFound(() => router.go(PagesPath.SIGN_IN));
    })
    .finally(() => router.start());
});
