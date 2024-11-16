import { UiButton } from "@ui/buttons/index.js";
import AuthActions from "@modules/auth/actions.js";

export default () =>
  UiButton({
    label: "Выход",
    variant: "link",
    className: "exit-button",
    onClick: () => {
      new AuthActions().logOut();
    },
  });
