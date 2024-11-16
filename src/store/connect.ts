import IComponent from "@utils/component.js";
import store, { StoreEvent } from "./store.js";

export const Connect = <T>(
  Component: new (...props: T[]) => IComponent,
  mapStateToProps: (state: T) => T | {},
) =>
  class Test extends Component {
    constructor(props: T = {} as T) {
      super({ ...props, ...mapStateToProps(store.getState() as T) });

      store.on(StoreEvent.Update, () => {
        this.setProps({ ...mapStateToProps(store.getState() as T) });
      });
    }
  };
