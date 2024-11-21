import ApiAuth from "@modules/auth/api.js";
import { SignInType, SignUpType } from "@modules/auth/types.js";
import { ActionForComponent } from "@utils/global-types/index.js";
import { parseErrorToJson } from "@utils/utils.js";
import { PagesPath } from "../../pages-path.js";
import { ERROR_STATUSES } from "../../enums.js";

class AuthActions {
  api: ApiAuth;

  constructor() {
    this.api = new ApiAuth();
  }

  async getUser() {
    return this.api.getUser();
  }

  signUp(params: SignUpType, { onSuccess, onError }: ActionForComponent) {
    this.api
      .signUp(params)
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
        window.location.replace(PagesPath.HOME);
      })
      .catch((err) => {
        const msg: string | undefined = ERROR_STATUSES.SING_UP[parseErrorToJson(err)];

        if (msg !== undefined && onError) {
          onError(msg);
        }
      });
  }

  signIn(params: SignInType, { onSuccess, onError }: ActionForComponent) {
    this.api
      .signIn(params)
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
        window.location.replace(PagesPath.HOME);
      })
      .catch((err) => {
        const msg: string | undefined = ERROR_STATUSES.SING_IN[parseErrorToJson(err)];

        if (msg !== undefined && onError) {
          onError(msg);
        }
      });
  }

  logOut() {
    this.api.logOut().then(() => window.location.reload());
  }
}
export default AuthActions;
