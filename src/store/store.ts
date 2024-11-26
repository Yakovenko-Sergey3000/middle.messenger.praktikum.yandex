import EventBus from "@utils/event-bus.js";
import { UserType } from "@utils/global-types/index.js";
import { UiChatItemType } from "@ui/chat-item/index.js";
import { DialogType } from "@modules/chat/dialog/script.js";
import { UiUserItemType } from "@ui/user-item/script.js";

export enum StoreEvent {
  Update = "update",
}

export type StoreStateType = {
  user: UserType | null;
  chatsList: UiChatItemType[];
  dialogData: DialogType | null;
  searchUserList: UiUserItemType[];
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
