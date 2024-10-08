import "./style.css";
import Handlebars from "handlebars";
import { widgetAuthForm } from "@widgets/auth-form/index.js";
import { uiFlushedInput } from "@ui/inputs/index.js";
import { widgetFormLabel } from "@widgets/form-label/index.js";

const tpm = Handlebars.compile(
  widgetFormLabel({
    element: uiFlushedInput(),
    label: "login",
  }),
);

document.querySelector("#app").innerHTML = widgetAuthForm({
  title: "Вход",
  content: tpm,
});
