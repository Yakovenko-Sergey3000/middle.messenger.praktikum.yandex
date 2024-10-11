import "../templates/settings-frame/settings-frame.css";
import "../templates/setting-field/setting-field.css";
import userSettingsLayout from "../settings-layout/settings-layout.js";
import Handlebars from "handlebars";
import settingsLayout from "../templates/settings-frame/settings-frame.hbs";
import settingBlock from "../templates/setting-field/setting-field.hbs";
import { VIEW_ACTIONS, VIEW_FIELDS_INFO } from "./fields.js";
import { uiCircleAvatar } from "@ui/avatar/index.js";

Handlebars.registerPartial("left_partial", (data) => data.left_partial);
Handlebars.registerPartial("right_partial", (data) => data.right_partial);
const settingBlockField = Handlebars.compile(settingBlock);

Handlebars.registerPartial("avatar", uiCircleAvatar());
Handlebars.registerPartial("field", settingBlockField);
Handlebars.registerPartial("action", settingBlockField);

const settingsBlockTmpl = Handlebars.compile(settingsLayout)({
  user_name: "Иван",
  user_fields_info: VIEW_FIELDS_INFO,
  user_actions: VIEW_ACTIONS,
});

Handlebars.registerPartial("settings_block", settingsBlockTmpl);
export default () =>
  userSettingsLayout({
    content: settingsBlockTmpl,
  });
