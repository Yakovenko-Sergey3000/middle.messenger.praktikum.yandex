import ApiAuth from "@modules/auth/api.js";
import { SignInType, SignUpType } from "@modules/auth/types.js";
import { ApiResponceActionType } from "@utils/global-types/index.js";
import store from "../../store/store.js";

class AuthActions {
  api: ApiAuth;

  constructor() {
    this.api = new ApiAuth();
  }

  isAuth() {
    const { user } = store.getState();

    if (!user) {
      this.api.request({
        onSuccess: (res) => {
          store.setState({ user: res });
        },
        onError: () => {},
      });
    }

    return !!user;
  }

  signUp(params: SignUpType, { onSuccess, onError }: ApiResponceActionType) {
    this.api.signUp(params, {
      onSuccess: () => {
        this.isAuth();
        onSuccess();
      },
      onError: (errorMessage) => onError(errorMessage),
    });
  }

  signIn(params: SignInType, { onSuccess, onError }: ApiResponceActionType) {
    this.api.signIn(params, {
      onSuccess: () => {
        this.isAuth();
        onSuccess();
      },
      onError: (errorMessage) => onError(errorMessage),
    });
  }

  logOut() {
    this.api.delete({
      onSuccess: () => {
        store.setState({ user: null });
      },
      onError: () => {},
    });
  }
}
export default AuthActions;
