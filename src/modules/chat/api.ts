import BaseApi from "@utils/api/base-api.js";
import Api from "@utils/api/api.js";
import { ApiResponceActionType } from "@utils/global-types/index.js";
import { ApiResponceType, parseApiResponceToJson, parseErrorToJson } from "@utils/utils.js";

const api = new Api("/chats");
class ChatsApi extends BaseApi {
  async request({ onSuccess, onError }: ApiResponceActionType) {
    try {
      const res = await api.get("/", {});

      onSuccess(parseApiResponceToJson(res).response);
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        onError(parseErrorToJson(err as ApiResponceType));
      }
    }
  }

  async getChatToken(chatId: number, { onSuccess, onError }: ApiResponceActionType) {
    try {
      const res = await api.post(`/token/${chatId}`, {});
      const preparedData = parseApiResponceToJson(res).response;

      onSuccess(preparedData.token);
    } catch (err) {
      if (typeof err === "object" && err !== null) {
        onError(parseErrorToJson(err as ApiResponceType));
      }
    }
  }
}

export default ChatsApi;
