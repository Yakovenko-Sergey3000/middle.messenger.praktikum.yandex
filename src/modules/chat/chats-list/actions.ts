import ChatsListApi from "@modules/chat/chats-list/api.js";
import store from "../../../store/store.js";

class ChatsListActions {
  api: ChatsListApi;

  constructor() {
    this.api = new ChatsListApi();
  }

  getChatsList() {
    this.api.request({
      onSuccess: (list) => {
        store.setState({ chatsList: list });
      },
      onError: () => {},
    });
  }

  getChatToken(chatId: number, onSuccess: (token: string) => void) {
    this.api.getChatToken(chatId, {
      onSuccess: (token) => {
        onSuccess(token as string);
      },
      onError: () => {},
    });
  }
}

export default ChatsListActions;
