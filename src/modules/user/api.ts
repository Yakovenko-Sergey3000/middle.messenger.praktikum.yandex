import BaseApi from "@utils/api/base-api.js";
import Api from "@utils/api/api.js";
import { UserType } from "@utils/global-types/index.js";
import { ChangeUserProfileType } from "@modules/user/types.js";
import { ApiResponceType, parseApiResponceToJson } from "@utils/utils.js";
import { ChangePasswordType } from "@modules/auth/types.js";
import { UiUserItemType } from "@ui/user-item/script.js";

const api = new Api("/user");
class UserApi extends BaseApi {
  async update(params: ChangeUserProfileType) {
    return api
      .put<ApiResponceType>("/profile", {
        data: params,
      })
      .then((res) => parseApiResponceToJson<{ status: number; response: UserType }>(res).response);
  }

  async changePassword(params: ChangePasswordType) {
    return api.put("/password", {
      data: params,
    });
  }

  async changeAvatar(formData: FormData) {
    return api
      .put<ApiResponceType>("/profile/avatar", {
        data: formData,
      })
      .then((res) => parseApiResponceToJson<{ status: number; response: UserType }>(res).response);
  }

  async searchUsers(login: string = "") {
    return api
      .post<ApiResponceType>("/search", {
        data: {
          login,
        },
      })
      .then(
        (res) =>
          parseApiResponceToJson<{ status: number; response: UiUserItemType[] }>(res).response,
      );
  }
}

export default UserApi;
