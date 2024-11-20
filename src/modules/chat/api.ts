import BaseApi from "@utils/api/base-api.js";
import Api from "@utils/api/api.js";
import { ApiResponceActionType } from "@utils/global-types/index.js";
import {
  ApiResponceType,
  ApiResponseAfterParse,
  parseApiResponceToJson,
  parseErrorToJson,
} from "@utils/utils.js";
import { ChatTokenType, CommonChatType } from "@modules/chat/types.js";

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

  async getChatToken(chatId: number): Promise<ChatTokenType> {
    return api
      .post<ApiResponceType>(`/token/${chatId}`)
      .then(
        (res) => parseApiResponceToJson<{ status: number; response: ChatTokenType }>(res).response,
      );
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

  async getCommonChat(chatId: number): Promise<CommonChatType[]> {
    return api
      .get<ApiResponceType>(`/${chatId}/common`)
      .then(
        (res) =>
          parseApiResponceToJson<{ status: number; response: CommonChatType[] }>(res).response,
      );
  }
}

export default ChatsApi;
