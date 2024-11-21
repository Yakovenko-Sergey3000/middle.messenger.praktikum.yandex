import BaseApi from "@utils/api/base-api.js";
import Api from "@utils/api/api.js";
import { ApiResponceActionType, UserType } from "@utils/global-types/index.js";
import { ChangePasswordType, ChangeUserProfileType } from "@modules/user/types.js";
import { ApiResponceType, parseApiResponceToJson, parseErrorToJson } from "@utils/utils.js";

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

  async findUser(login: string, { onSuccess, onError }: ApiResponceActionType) {
    try {
      const res = await api.post("/search", {
        data: {
          login,
        },
      });
      const preparedData = parseApiResponceToJson(res).response;

      onSuccess(preparedData);
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        onError(parseErrorToJson(err as ApiResponceType));
      }
    }
  }
}

export default UserApi;
