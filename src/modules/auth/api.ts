import Api from "@utils/api/api.ts";
import { SignInType, SignUpType } from "@modules/auth/types.ts";
import { ApiResponceType, parseApiResponceToJson } from "@utils/utils.ts";
import { UserType } from "@utils/global-types/index.ts";

const api = new Api("/auth");
class ApiAuth {
  async getUser() {
    return api
      .get<ApiResponceType>("/user")
      .then((res) => parseApiResponceToJson<{ status: number; response: UserType }>(res).response);
  }

  async signUp(params: SignUpType) {
    return api.post("/signup", {
      data: params,
    });
  }

  async signIn(params: SignInType) {
    return api.post<ApiResponceType>("/signin", {
      data: params,
    });
  }

  async logOut() {
    return api.post("/logout");
  }
}

export default ApiAuth;
