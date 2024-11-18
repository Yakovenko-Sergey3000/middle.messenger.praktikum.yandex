import ChatsApi from "@modules/chat/api.js";
import Router from "@utils/router/index.js";
import store from "../../store/store.js";
import { PagesPath } from "../../pages-path.js";

class ChatsActions {
  api: ChatsApi;

  router: Router;

  constructor() {
    this.api = new ChatsApi();
    this.router = new Router();
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

  openChat(chatId: number) {
    this.router.go(`${PagesPath.CHAT}/${chatId}`);
    this.getChatToken(chatId, (chatToken) => {
      store.setState({ dialogData: { chatToken, chatId } });
    });
  }
}

export default ChatsActions;
