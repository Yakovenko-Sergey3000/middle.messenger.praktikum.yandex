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

  addChat(candidate: UserType, onSuccess: () => void) {
    const { user } = store.getState();
    const firstUser = user?.display_name || user?.login;
    const secondUser = candidate.display_name || candidate.login;
    const titleChat = `${firstUser}/${secondUser}`;

    this.api.create(titleChat).then((res) => {
      this.addUserToChat({ chatId: res.id, users: [user as UserType, candidate] });
      onSuccess();
    });
  }

  addUserToChat({ chatId, users }: { chatId: number; users: UserType[] }) {
    this.api
      .addUserToChat(
        chatId,
        users.map((user) => user.id),
      )
      .then(() => this.getChatsList());
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
      const users = await this.api.getUserIntoChat(chatId).catch(() => {
        this.router.go(PagesPath.HOME);

        return [];
      });

      const chatInfo = users.filter((userInfo) => userInfo.id !== user?.id);

      const params = {
        id: chatId,
        title: chatInfo[0]?.display_name || chatInfo[0]?.login,
        avatar: chatInfo[0].avatar,
        role: chatInfo[0].role,
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

  searchUser(login: string = "", onSuccess?: () => void) {
    this.userApi.searchUsers(login).then((res) => {
      store.setState({ searchUserList: res });
      if (onSuccess) {
        onSuccess();
      }
    });
  }

  clearSearchedUser() {
    store.setState({ searchUserList: [] });
  }

  deleteChat() {
    const { dialogData } = store.getState();
    console.log(dialogData);
    // if (dialogData?.id) {
    //   this.api.delete(dialogData.id).then(() => {
    //     this.router.go(PagesPath.HOME);
    //     this.getChatsList();
    //   });
    // }
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
