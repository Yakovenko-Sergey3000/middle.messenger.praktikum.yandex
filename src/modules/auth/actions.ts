import ApiAuth from "@modules/auth/api.js";
import { SignInType, SignUpType } from "@modules/auth/types.js";
import { ApiResponceActionType } from "@utils/global-types/index.js";
import store from "../../store/store.js";
import { PagesPath } from "../../pages-path.js";

class AuthActions {
  api: ApiAuth;

  constructor() {
    this.api = new ApiAuth();
  }

  getUser() {
    this.api.request({
      onSuccess: (res) => {
        store.setState({ user: res });
      },
      onError: () => {
        store.setState({ user: null });
      },
    });
  }

  isAuth() {
    const { user } = store.getState();

    return !!user;
  }

  signUp(params: SignUpType, { onSuccess, onError }: ApiResponceActionType) {
    this.api.signUp(params, {
      onSuccess: () => {
        onSuccess();
        window.location.replace(PagesPath.HOME);
      },
      onError: (errorMessage) => onError(errorMessage),
    });
  }

  signIn(params: SignInType, { onSuccess, onError }: ApiResponceActionType) {
    this.api.signIn(params, {
      onSuccess: () => {
        onSuccess();
        window.location.replace(PagesPath.HOME);
      },
      onError: (errorMessage) => onError(errorMessage),
    });
  }

  logOut() {
    this.api.delete({
      onSuccess: () => {
        window.location.reload();
      },
      onError: () => {},
    });
  }
}
export default AuthActions;
