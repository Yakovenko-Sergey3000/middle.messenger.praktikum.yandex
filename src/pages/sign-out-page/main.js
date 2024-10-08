import "@global-style";
import Handlebars from "handlebars";
import { moduleSignOut } from "@modules/auth/sign-out/index.js";

const tpm = Handlebars.compile(moduleSignOut());

document.querySelector("#app").innerHTML = tpm();
