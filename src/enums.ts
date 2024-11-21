import { Any } from "./utils/global-types/index.ts";

export const ERROR_STATUSES: Any = {
  SING_IN: {
    "Login or password is incorrect": "Неверный логин или пароль",
  },
  SING_UP: {
    "Login already exists": "Пользователь с таким логином уже существует",
  },
};

export const YA_ENDPOINTS = {
  api: "https://ya-praktikum.tech/api/v2",
  resources: "https://ya-praktikum.tech/api/v2/resources",
  ws: "wss://ya-praktikum.tech/ws/chats/",
};
