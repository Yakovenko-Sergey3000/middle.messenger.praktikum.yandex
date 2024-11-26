import BaseApi from "@utils/api/base-api.ts";
import Api from "@utils/api/api.ts";
import { ApiResponceType, parseApiResponceToJson } from "@utils/utils.ts";
import { ChatTokenType, ChatUsersType, DeleteChatType } from "@modules/chat/types.ts";
import { UiChatItemType } from "@ui/chat-item/index.ts";

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

  async delete(chatId: number): Promise<DeleteChatType> {
    return api
      .delete<ApiResponceType>("/", {
        data: {
          chatId,
        },
      })
      .then(
        (res) => parseApiResponceToJson<{ status: number; response: DeleteChatType }>(res).response,
      );
  }

  async deleteUserFormChat(chatId: number, users: number[]): Promise<string> {
    return api
      .delete<ApiResponceType>("/users", {
        data: {
          users,
          chatId,
        },
      })
      .then(() => "OK");
  }
}

export default ChatsApi;
