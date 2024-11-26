import { UiAvatar } from "@ui/avatar/index.ts";

export default (src?: string | null) =>
  UiAvatar({
    width: "130px",
    height: "130px",
    src: src || "",
    alt: "Avatar",
    variant: "circle",
    className: "user_avatar",
  });
