import BaseApi from "@utils/api/base-api.ts";
import Api from "@utils/api/api.ts";
import { UserType } from "@utils/global-types/index.ts";
import { ChangeUserProfileType } from "@modules/user/types.ts";
import { ApiResponceType, parseApiResponceToJson } from "@utils/utils.ts";
import { ChangePasswordType } from "@modules/auth/types.ts";
import { UiUserItemType } from "@ui/user-item/script.ts";

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
