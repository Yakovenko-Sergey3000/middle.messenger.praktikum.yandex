import BaseApi from "@utils/api/base-api.js";
import Api from "@utils/api/api.js";
import { SignInType, SignUpType } from "@modules/auth/types.js";
import { ApiResponceType, parseApiResponceToJson, parseErrorToJson } from "@utils/utils.js";
import { ApiResponceActionType } from "@utils/global-types/index.js";

const api = new Api("/auth");
class ApiAuth extends BaseApi {
  async request({ onSuccess, onError }: ApiResponceActionType) {
    try {
      const res = await api.get("/user", {});

      let user = null;
      user = parseApiResponceToJson(res).response;

      onSuccess(user);
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        onError(parseErrorToJson(err as ApiResponceType));
      }
    }
  }

  async signUp(params: SignUpType, { onSuccess, onError }: ApiResponceActionType) {
    try {
      await api.post("/signup", {
        data: params,
      });

      onSuccess();
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        onError(parseErrorToJson(err as ApiResponceType));
      }
    }
  }

  async signIn(params: SignInType, { onSuccess, onError }: ApiResponceActionType) {
    try {
      await api.post("/signin", {
        data: params,
      });

      onSuccess();
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        onError(parseErrorToJson(err as ApiResponceType));
      }
    }
  }

  async delete({ onSuccess, onError }: ApiResponceActionType) {
    try {
      await api.post("/logout", {});
      onSuccess();
    } catch (err) {
      onError(parseErrorToJson(err as ApiResponceType));
    }
  }
}

export default ApiAuth;
