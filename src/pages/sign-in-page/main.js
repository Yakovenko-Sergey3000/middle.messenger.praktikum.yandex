import "@global-style";
import Handlebars from "handlebars";
import { moduleSignIn } from "@modules/auth/sign-in/index.js";

const tpm = Handlebars.compile(moduleSignIn());

document.querySelector("#app").innerHTML = tpm();
