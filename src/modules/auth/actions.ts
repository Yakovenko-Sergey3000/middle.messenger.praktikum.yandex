import ApiAuth from "@modules/auth/api.ts";
import { SignInType, SignUpType } from "@modules/auth/types.ts";
import { ActionForComponent, UserType } from "@utils/global-types/index.ts";
import { parseErrorToJson } from "@utils/utils.ts";
import { PagesPath } from "../../pages-path.ts";
import { ERROR_STATUSES } from "../../enums.ts";
import store from "../../store/store.ts";

class AuthActions {
  api: ApiAuth;

  constructor() {
    this.api = new ApiAuth();
  }

  async getUser() {
    return this.api.getUser();
  }

  signUp(
    params: SignUpType,
    { onSuccess = () => {}, onError = () => {} }: ActionForComponent<string>,
  ) {
    this.api
      .signUp(params)
      .then(() => {
        onSuccess();
        window.location.replace(PagesPath.MESSENGER);
      })
      .catch((err) => {
        const msg: string | undefined = ERROR_STATUSES.AUTH.SING_UP[parseErrorToJson(err)];

        if (msg !== undefined) {
          onError(msg);
        }
      });
  }

  signIn(params: SignInType, { onSuccess, onError }: ActionForComponent<string>) {
    this.api
      .signIn(params)
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
        window.location.replace(PagesPath.MESSENGER);
      })
      .catch((err) => {
        const msg: string | undefined = ERROR_STATUSES.AUTH.SING_IN[parseErrorToJson(err)];

        if (msg !== undefined && onError) {
          onError(msg);
        }
      });
  }

  setUser(user: UserType) {
    store.setState({ user });
  }

  logOut() {
    this.api.logOut().then(() => window.location.reload());
  }
}
export default AuthActions;
