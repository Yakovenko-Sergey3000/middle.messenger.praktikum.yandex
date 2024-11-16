import IComponent from "@utils/component.js";
import store, { StoreEvent, StoreStateType } from "./store.js";

export const Connect = <T extends StoreStateType>(
  Component: new (props?: T) => IComponent,
  mapStateToProps: (state: StoreStateType) => T | {},
) =>
  class Test extends Component {
    constructor(props: T = {} as T) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvent.Update, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
