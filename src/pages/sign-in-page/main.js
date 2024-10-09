import "@global-style";
import { moduleSignIn } from "@modules/auth/sign-in/index.js";

document.querySelector("#app").innerHTML = moduleSignIn();
