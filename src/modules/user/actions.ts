import UserApi from "@modules/user/api.js";
import { ChangePasswordType, ChangeUserProfileType } from "@modules/user/types.js";
import Router from "@utils/router/index.js";
import store from "../../store/store.js";

class UserActions {
  api: UserApi;

  router: Router;

  constructor() {
    this.api = new UserApi();
    this.router = new Router();
  }

  updateUser(data: ChangeUserProfileType) {
    this.api.update(data, {
      onSuccess: (newUserData) => {
        store.setState({ user: newUserData });
        this.router.back();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }

  changePassword(params: ChangePasswordType, onSuccess: () => void) {
    this.api.changePassword(params, {
      onSuccess: () => {
        onSuccess();
        this.router.back();
      },
      onError: () => {},
    });
  }
}

export default UserActions;
