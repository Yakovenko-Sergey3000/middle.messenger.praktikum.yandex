import ChatsApi from "@modules/chat/api.js";
import Router from "@utils/router/index.js";
import { UserApi } from "@modules/user/index.js";
import { UserType } from "@utils/global-types/index.js";
import store from "../../store/store.js";
import { PagesPath } from "../../pages-path.js";

class ChatsActions {
  api: ChatsApi;

  router: Router;

  userApi: UserApi;

  constructor() {
    this.api = new ChatsApi();
    this.router = new Router();
    this.userApi = new UserApi();
  }

  getChatsList() {
    this.api.request({
      onSuccess: (list) => {
        store.setState({ chatsList: list });
      },
      onError: () => {},
    });
  }

  addChat(login: string, closeForm: () => void, addError: (msg?: string) => void) {
    this.userApi.findUser(login, {
      onSuccess: (users) => {
        if (Array.isArray(users) && users.length) {
          this.api.create(users[0].first_name, {
            onSuccess: (id) => {
              closeForm();
              this.addUserToChat({ chatId: id as number, users });
            },
            onError: (msg) => addError(msg as string),
          });
        } else {
          addError();
        }
      },
      onError: (msg) => addError(msg as string),
    });
  }

  addUserToChat({ chatId, users }: { chatId: number; users: UserType[] }) {
    this.api.addUserToChat(
      chatId,
      users.map((user) => user.id),
      () => this.getChatsList(),
    );
  }

  getChatToken(chatId: number, onSuccess: (token: string) => void) {
    this.api.getChatToken(chatId, {
      onSuccess: (token) => {
        onSuccess(token as string);
      },
      onError: () => {
        this.router.go(PagesPath.HOME);
      },
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
