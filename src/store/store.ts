import EventBus from "@utils/event-bus.ts";
import { UserType } from "@utils/global-types/index.ts";
import { UiChatItemType } from "@ui/chat-item/index.ts";
import { DialogType } from "@modules/chat/dialog/script.ts";
import { UiUserItemType } from "@ui/user-item/script.ts";

export enum StoreEvent {
  Update = "update",
}

export type StoreStateType = {
  user: UserType | null;
  chatsList: UiChatItemType[];
  dialogData: DialogType | null;
  searchUserList: UiUserItemType[];
  usersInChat: UserType[];
};
class Store extends EventBus<StoreStateType> {
  private state: StoreStateType;

  constructor() {
    super();

    this.state = {
      user: null,
      chatsList: [],
      dialogData: null,
      searchUserList: [],
      usersInChat: [],
    };

    this.on(StoreEvent.Update, () => {});
  }

  getState(): StoreStateType {
    return this.state;
  }

  setState(newData: Record<string, unknown>) {
    this.state = { ...this.state, ...newData };
    this.emit(StoreEvent.Update);
  }
}

export default new Store();
