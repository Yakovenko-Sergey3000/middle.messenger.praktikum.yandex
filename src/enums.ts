import { Any } from "./utils/global-types/index.ts";

export const ERROR_STATUSES: Any = {
  SING_IN: {
    "Login or password is incorrect": "Неверный логин или пароль",
  },
  SING_UP: {
    "Login already exists": "Пользователь с таким логином уже существует",
  },
  CHANGE_USER: {
    "Password is incorrect": {
      key: "oldPassword",
      msg: "Неверный пароль",
    },
    "Login already exists": {
      key: "login",
      msg: "Пользователь с таким логином уже существует",
    },
    "Email already exists": {
      key: "email",
      msg: "Пользователь с таким email уже существует",
    },
  },
};

export const YA_ENDPOINTS = {
  api: "https://ya-praktikum.tech/api/v2",
  resources: "https://ya-praktikum.tech/api/v2/resources",
  ws: "wss://ya-praktikum.tech/ws/chats/",
};
