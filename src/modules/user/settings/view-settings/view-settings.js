import "../templates/settings-layout/settings-layout.css";
import "../templates/setting-block/setting-block.css";
import { layoutUserSettings } from "@layouts/user-settings/index.js";
import Handlebars from "handlebars";
import settingsLayout from "../templates/settings-layout/settings-layout.hbs";
import settingBlock from "../templates/setting-block/setting-block.hbs";
import { VIEW_ACTIONS, VIEW_FIELDS_INFO } from "./fields.js";

Handlebars.registerPartial("left_partial", (data) => data.left_partial);
Handlebars.registerPartial("right_partial", (data) => data.right_partial);
const settingBlockField = Handlebars.compile(settingBlock);

Handlebars.registerPartial("field", settingBlockField);
Handlebars.registerPartial("action", settingBlockField);

const settingsBlockTml = Handlebars.compile(settingsLayout)({
  user_name: "Иван",
  user_fields_info: VIEW_FIELDS_INFO,
  user_actions: VIEW_ACTIONS,
});

Handlebars.registerPartial("settings_block", settingsBlockTml);
export default () =>
  layoutUserSettings({
    content: settingsBlockTml,
  });
