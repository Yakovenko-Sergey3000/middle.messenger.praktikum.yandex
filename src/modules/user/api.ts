import BaseApi from "@utils/api/base-api.js";
import Api from "@utils/api/api.js";
import { ApiResponceActionType } from "@utils/global-types/index.js";
import { ChangePasswordType, ChangeUserProfileType } from "@modules/user/types.js";
import { ApiResponceType, parseApiResponceToJson, parseErrorToJson } from "@utils/utils.js";

const api = new Api("/user");
class UserApi extends BaseApi {
  async update(params: ChangeUserProfileType, { onSuccess, onError }: ApiResponceActionType) {
    try {
      const res = await api.put("/profile", {
        data: params,
      });

      onSuccess(parseApiResponceToJson(res).response);
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        onError(parseErrorToJson(err as ApiResponceType));
      }
    }
  }

  async changePassword(params: ChangePasswordType, { onSuccess, onError }: ApiResponceActionType) {
    try {
      await api.put("/password", {
        data: params,
      });

      onSuccess();
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        onError(parseErrorToJson(err as ApiResponceType));
      }
    }
  }

  async changeAvatar(formData: FormData, { onSuccess, onError }: ApiResponceActionType) {
    try {
      const res = await api.put("/profile/avatar", {
        data: formData,
      });

      onSuccess(parseApiResponceToJson(res).response);
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        onError(parseErrorToJson(err as ApiResponceType));
      }
    }
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
