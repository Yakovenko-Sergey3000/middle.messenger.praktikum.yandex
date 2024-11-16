import AuthActions from "@modules/auth/actions.js";
import Router from "@utils/router/index.js";
import { PagesPath } from "../pages-path.js";
import store, { StoreEvent } from "../store/store.js";

const authAction = new AuthActions();
const router = new Router();

export function isUserAuth() {
  return () => {
    if (authAction.isAuth()) {
      router.go(PagesPath.HOME);
    }
  };
}
export function isUserNotAuth() {
  return () => {
    if (!authAction.isAuth()) {
      router.go(PagesPath.SIGN_IN);
    }
  };
}

store.on(StoreEvent.Update, () => {
  isUserAuth()();
  isUserNotAuth()();
});
