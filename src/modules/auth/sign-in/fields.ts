import { AuthFieldType } from "@modules/auth/types.ts";

export const FIELDS: AuthFieldType[] = [
  {
    id: "login",
    name: "login",
    label: "Логин",
  },
  {
    id: "password",
    name: "password",
    label: "Пароль",
    type: "password",
    autocomplete: "new-password",
  },
];
