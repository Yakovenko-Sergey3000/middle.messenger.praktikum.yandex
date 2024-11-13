import { set } from "./utils.js";
import EventBus from "./event-bus.js";

export enum StoreEvent {
  Update = "update",
}

type StateType = {
  [key: string]: unknown;
};
class Store extends EventBus<StateType> {
  private state: StateType = {};

  getState(): StateType {
    return this.state;
  }

  setState(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvent.Update);
  }
}

export default new Store();
