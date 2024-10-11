import "@global-style";
import { moduleSignIn } from "@modules/auth/index.js";

document.querySelector("#app").innerHTML = moduleSignIn();
