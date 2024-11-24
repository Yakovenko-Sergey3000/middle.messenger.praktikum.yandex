import ChatsApi from "@modules/chat/api.js";
import Router from "@utils/router/index.js";
import { UserApi } from "@modules/user/index.js";
import { Any, UserType } from "@utils/global-types/index.js";
import WS, { WSEvents } from "@utils/web-socket.js";
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
    this.api.request().then((list) => {
      store.setState({ chatsList: list });
      this.#scrollToBottom();
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

  async openChat(chatId: number) {
    if (this.router.atPath !== `${PagesPath.CHAT}/${chatId}`) {
      this.router.go(`${PagesPath.CHAT}/${chatId}`);
    }

    const { user, dialogData } = store.getState();

    if (dialogData !== null && dialogData.ws) {
      dialogData.ws.close();
    }

    try {
      const usersInChat = await this.api.getCommonChat(chatId);

      const params = {
        id: chatId,
        title: usersInChat[0].id,
        avatar: usersInChat[0].avatar,
        loading: true,
        ws: null,
      };

      store.setState({
        dialogData: params,
      });

      const chatToken = await this.api.getChatToken(chatId);

      if (chatToken.token) {
        const ws = new WS(`/${user?.id}/${chatId}/${chatToken.token}`);
        ws.on(WSEvents.MESSAGE, this.#setMessages.bind(this));
        ws.connect().then(() => {
          ws.send({ content: "0", type: "get old" });
          store.setState({ dialogData: { ...params, ws } });
        });
      }
    } catch (e) {
      /* empty */
    }
  }

  #scrollToBottom() {
    const divMessage = document.querySelector(".dialog__messages");
    if (divMessage !== null) {
      divMessage.scrollTop = divMessage.scrollHeight;
    }
  }

  #setMessages(data: Any) {
    const { messages, dialogData } = store.getState();
    if (Array.isArray(data)) {
      store.setState({
        messages: [...data.reverse()],
        dialogData: { ...dialogData, loading: false },
      });
      this.#scrollToBottom();
    }

    if (data.type === WSEvents.MESSAGE) {
      const copyMessages: object[] = [...messages];
      copyMessages.push(data);
      store.setState({ messages: copyMessages });
      this.#scrollToBottom();
      setTimeout(() => this.getChatsList(), 1000);
    }
  }
}

export default ChatsActions;
