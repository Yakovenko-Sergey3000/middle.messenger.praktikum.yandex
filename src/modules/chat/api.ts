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

  async create(title: string, { onSuccess, onError }: ApiResponceActionType) {
    try {
      const res = await api.post("/", {
        data: { title },
      });

      onSuccess(parseApiResponceToJson(res).response.id as number);
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

  async addUserToChat(chatId: number, users: number[], onSuccess: () => void) {
    try {
      await api.put("/users", {
        data: {
          chatId,
          users,
        },
      });
      onSuccess();
    } catch (err) {
      /* empty */
    }
  }
}

export default ChatsApi;
