import { LayoutErrorPage } from "@layouts/_404-500/index.ts";
import { UiButton } from "@ui/buttons/index.ts";

export const NotFound = (onBack: () => void) =>
  LayoutErrorPage({
    title: "404",
    subtitle: "Не туда попали",
    linkBackButton: UiButton({
      variant: "link",
      label: "Назад к чатам",
      onClick: onBack,
    }),
  });
