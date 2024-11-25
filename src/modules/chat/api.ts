import BaseApi from "@utils/api/base-api.js";
import Api from "@utils/api/api.js";
import { ApiResponceType, parseApiResponceToJson } from "@utils/utils.js";
import { ChatTokenType, ChatUsersType } from "@modules/chat/types.js";
import { UiChatItemType } from "@ui/chat-item/index.js";

const api = new Api("/chats");
class ChatsApi extends BaseApi {
  async request() {
    return api
      .get<ApiResponceType>("/")
      .then(
        (res) =>
          parseApiResponceToJson<{ status: number; response: UiChatItemType[] }>(res).response,
      );
  }

  async create(title: string) {
    return api
      .post<ApiResponceType>("/", {
        data: { title },
      })
      .then(
        (res) => parseApiResponceToJson<{ status: number; response: { id: number } }>(res).response,
      );
  }

  async getChatToken(chatId: number) {
    return api
      .post<ApiResponceType>(`/token/${chatId}`)
      .then(
        (res) => parseApiResponceToJson<{ status: number; response: ChatTokenType }>(res).response,
      );
  }

  async addUserToChat(chatId: number, users: number[]) {
    return api.put("/users", {
      data: {
        chatId,
        users,
      },
    });
  }

  async getUserIntoChat(chatId: number): Promise<ChatUsersType[]> {
    return api
      .get<ApiResponceType>(`/${chatId}/users`)
      .then(
        (res) =>
          parseApiResponceToJson<{ status: number; response: ChatUsersType[] }>(res).response,
      );
  }
}

export default ChatsApi;
