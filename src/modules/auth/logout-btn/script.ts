import { UiButton } from "@ui/buttons/index.ts";
import AuthActions from "@modules/auth/actions.ts";

export default () =>
  UiButton({
    label: "Выход",
    variant: "link",
    className: "exit-button",
    onClick: () => {
      new AuthActions().logOut();
    },
  });
