import "./styles.css";
import { UiAvatar } from "@ui/avatar/index.ts";
import ChatsActions from "@modules/chat/actions.ts";
import Router from "@utils/router/index.ts";
import WS from "@utils/web-socket.ts";
import { UiModal } from "@ui/modal/index.ts";
import SearchUserBlock from "@modules/chat/components/search-users-block/script.ts";
import template from "./template.hbs.ts";
import Component from "../../../utils/component.ts";
import DialogFooter from "./components/dialog-footer/script.ts";
import MessageItem from "./components/message-item/script.ts";
import { Connect } from "../../../store/connect.ts";
import { PagesPath } from "../../../pages-path.ts";
import DialogMenu from "./components/dialog-menu/script.ts";

export type DialogType = {
  id: number;
  title: string;
  ws: WS<number | string | object> | null;
  loading: boolean;
  role: string;
  avatar: string | null;
  messages: [];
};
class Dialog extends Component {
  constructor() {
    super("div", {
      attributes: { class: "dialog" },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default (chatActions: ChatsActions) => {
  const splitCurrentPath = new Router().atPath.split("/");
  const currentId = splitCurrentPath[splitCurrentPath.length - 1];

  if (splitCurrentPath.includes(PagesPath.MESSENGER.replace("/", ""))) {
    chatActions.openChat(Number(currentId));
  }

  const modal = UiModal({
    content: SearchUserBlock({
      onClickItem: (user) => {
        chatActions.addUserToChat({
          users: [user],
        });
        modal.onClose();
      },
    }),
  });

  return new (Connect(Dialog, (state) => {
    if (state.dialogData) {
      return {
        dialogAvatar: UiAvatar({
          width: "54px",
          height: "54px",
          alt: "Avatar",
          src: state.dialogData.avatar,
          className: "dialog-avatar",
        }),
        modal,
        dialogMenu: DialogMenu({
          openModalAddUserToChat: () => modal.onOpen(),
        }),
        isLoading: state.dialogData.loading,
        userName: state.dialogData.title,
        // eslint-disable-next-line camelcase
        messages: state.dialogData.messages.map(({ content, user_id }) => {
          // eslint-disable-next-line camelcase
          const isOwner = state.user && state.user.id === user_id;

          return MessageItem({ message: content, className: isOwner ? "right" : "" });
        }),
        footer: DialogFooter({
          className: "footer",
          onSubmit: (e: Event) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const fd: FormData = new FormData(target);
            const data: Record<string, FormDataEntryValue> = {};

            fd.forEach((val, key) => {
              data[key] = val;
            });

            if (!data.message) {
              return;
            }

            if (state.dialogData !== null && state.dialogData.ws) {
              state.dialogData.ws.send({ content: data.message, type: "message" });
            }
            target.reset();
          },
        }),
      };
    }
    return {};
  }))();
};
