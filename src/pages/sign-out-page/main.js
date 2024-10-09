import "@global-style";
import { moduleSignOut } from "@modules/auth/sign-out/index.js";

document.querySelector("#app").innerHTML = moduleSignOut();
