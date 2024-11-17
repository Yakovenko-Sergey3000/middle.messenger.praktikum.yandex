import EventBus from "@utils/event-bus.js";
import { UserType } from "@utils/global-types/index.js";
import { UiChatItemType } from "@ui/chat-item/index.js";

export enum StoreEvent {
  Update = "update",
}

export type StoreStateType = {
  user: UserType | null;
  chatsList: UiChatItemType[];
  dialogToken: string | null;
  [key: string]: unknown;
};
class Store extends EventBus<StoreStateType> {
  private state: StoreStateType;

  constructor() {
    super();

    this.state = {
      user: null,
      chatsList: [],
      dialogToken: null,
    };
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