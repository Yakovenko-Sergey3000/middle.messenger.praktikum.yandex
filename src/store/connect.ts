import IComponent from "@utils/component.ts";
import store, { StoreEvent, StoreStateType } from "./store.ts";

export const Connect = <T>(
  Component: new (...props: T[]) => IComponent,
  mapStateToProps: (state: StoreStateType) => T | {},
) =>
  class extends Component {
    constructor(props: T = {} as T) {
      super({ ...props });

      store.on(StoreEvent.Update, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
