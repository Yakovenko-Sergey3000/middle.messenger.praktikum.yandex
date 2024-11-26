import ChatsApi from "@modules/chat/api.ts";
import Router from "@utils/router/index.ts";
import { Any, UserType } from "@utils/global-types/index.ts";
import WS, { WSEvents } from "@utils/web-socket.ts";
import IntervalGetChats from "@modules/chat/interval-get-chats.ts";
import { UserApi } from "@modules/user/index.ts";
import store from "../../store/store.ts";
import { PagesPath } from "../../pages-path.ts";

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

  createChat(title: string, onSuccess: () => void) {
    this.api.create(title).then(() => {
      this.getChatsList();
      onSuccess();
    });
  }

  addUserToChat({ users }: { users: UserType[] }) {
    const { dialogData } = store.getState();

    if (dialogData !== null) {
      this.api
        .addUserToChat(
          dialogData.id,
          users.map((user) => user.id),
        )
        .then(() => this.openChat(dialogData.id));
    }
  }

  async openChat(chatId: number) {
    if (this.router.atPath !== `${PagesPath.MESSENGER}/${chatId}`) {
      this.router.go(`${PagesPath.MESSENGER}/${chatId}`);
    }

    const { user, dialogData } = store.getState();

    if (dialogData !== null && dialogData.ws) {
      dialogData.ws.close();
    }

    try {
      const users = await this.api.getUserIntoChat(chatId).catch(() => {
        this.router.go(PagesPath.MESSENGER);

        return [];
      });

      const chatInfo = users.filter((userInfo) => userInfo.id !== user?.id);

      const params = {
        id: chatId,
        title: [...chatInfo, user]
          .map((userParams) => userParams?.display_name || userParams?.login)
          .join(", "),
        avatar: chatInfo[0]?.avatar,
        role: chatInfo[0]?.role,
        loading: true,
        messages: [],
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

    if (dialogData?.id) {
      this.api.delete(dialogData.id).then(() => {
        this.router.go(PagesPath.MESSENGER);
        this.getChatsList();
      });
    }
  }

  #scrollToBottom() {
    const divMessage = document.querySelector(".dialog__messages");
    if (divMessage !== null) {
      divMessage.scrollTop = divMessage.scrollHeight;
    }
  }

  #setMessages(data: Any) {
    IntervalGetChats.restart();

    const { dialogData } = store.getState();

    if (Array.isArray(data)) {
      store.setState({
        dialogData: { ...dialogData, loading: false, messages: [...data.reverse()] },
      });
      this.#scrollToBottom();
    }

    if (data.type === WSEvents.MESSAGE && dialogData !== null) {
      const copyMessages: object[] = [...dialogData.messages];
      copyMessages.push(data);

      store.setState({ dialogData: { ...dialogData, messages: copyMessages } });
      this.#scrollToBottom();
      setTimeout(() => this.getChatsList(), 1000);
    }
  }
}

export default ChatsActions;
