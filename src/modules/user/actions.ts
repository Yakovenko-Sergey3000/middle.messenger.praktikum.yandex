import UserApi from "@modules/user/api.ts";
import { ChangeUserProfileType } from "@modules/user/types.ts";
import Router from "@utils/router/index.ts";
import { ActionForComponent } from "@utils/global-types/index.ts";
import { parseErrorToJson } from "@utils/utils.ts";
import { ChangePasswordType } from "@modules/auth/types.ts";
import store from "../../store/store.ts";
import { ERROR_STATUSES } from "../../enums.ts";

class UserActions {
  api: UserApi;

  router: Router;

  constructor() {
    this.api = new UserApi();
    this.router = new Router();
  }

  updateUser(
    data: ChangeUserProfileType,
    { onError = () => {} }: ActionForComponent<{ key: string; msg: string }>,
  ) {
    this.api
      .update(data)
      .then((user) => {
        store.setState({ user });
        this.router.back();
      })
      .catch((err) => {
        const error = ERROR_STATUSES.CHANGE_USER[parseErrorToJson(err)];

        if (error !== undefined) {
          onError(error);
        }
      });
  }

  changePassword(
    params: ChangePasswordType,
    { onSuccess = () => {}, onError }: ActionForComponent<string>,
  ) {
    this.api
      .changePassword(params)
      .then(() => {
        onSuccess();
        this.router.back();
      })
      .catch((err) => {
        const msg = ERROR_STATUSES.CHANGE_USER[parseErrorToJson(err)];

        if (msg !== undefined && onError) {
          onError(msg);
        }
      });
  }

  async changeAvatar(file: File, { onSuccess = () => {} }: ActionForComponent<void>) {
    const formData = new FormData();
    formData.append("avatar", file);

    this.api.changeAvatar(formData).then((user) => {
      onSuccess();
      store.setState({ user });
    });
  }
}

export default UserActions;
