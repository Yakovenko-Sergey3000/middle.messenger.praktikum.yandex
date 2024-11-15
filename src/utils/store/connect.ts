import store, { StoreEvent } from "@utils/store/store.js";
import IComponent from "@utils/component.js";

export const Connect = <T extends Record<string, unknown>>(
  Component: new (props: T) => IComponent,
  mapStateToProps: (state: Record<string, unknown>) => Record<string, unknown> | {},
) =>
  class Test extends Component {
    constructor(props: T) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvent.Update, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
