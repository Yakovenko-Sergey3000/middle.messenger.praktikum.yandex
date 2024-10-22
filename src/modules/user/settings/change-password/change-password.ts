import Handlebars from "handlebars";
import { uiButtonMain } from "@ui/buttons/index.js";
import { uiCircleAvatar } from "@ui/avatar/index.js";
import settingsLayout from "../templates/settings-frame/settings-frame.hbs.js";
import "../templates/setting-field/setting-field.css";
import userSettingsLayout from "../settings-layout/settings-layout.js";
import settingBlock from "../templates/setting-field/setting-field.hbs.js";
import { VIEW_FIELDS_INFO } from "./fields.js";

export default () => {
  Handlebars.registerPartial("avatar", uiCircleAvatar());
  Handlebars.registerPartial("left_partial", (data) => data.left_partial);
  Handlebars.registerPartial("right_partial", (data) => data.right_partial);
  const settingBlockField = Handlebars.compile(settingBlock);

  Handlebars.registerPartial("field", settingBlockField);
  Handlebars.registerPartial(
    "save_button",
    uiButtonMain({
      label: "Сохранить",
    }),
  );

  const settingsBlockTml = Handlebars.compile(settingsLayout)({
    user_fields_info: VIEW_FIELDS_INFO,
    is_change: true,
  });

  Handlebars.registerPartial("settings_block", settingsBlockTml);

  return userSettingsLayout({
    content: settingsBlockTml,
  });
};
