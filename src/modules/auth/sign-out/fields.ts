import { SignOutFieldType } from "@modules/auth/sign-out/types.js";

export const FIELDS: SignOutFieldType[] = [
  {
    id: "login",
    name: "login",
    label: "Логин",
  },
  {
    id: "first_name",
    name: "first_name",
    label: "Имя",
  },
  {
    id: "second_name",
    name: "second_name",
    label: "Фамилия",
  },
  {
    id: "phone",
    name: "phone",
    label: "Телефон",
  },
  {
    id: "email",
    name: "email",
    label: "Почта",
    type: "email",
    autocomplete: "email",
  },
  {
    id: "password",
    name: "password",
    label: "Пароль",
    type: "password",
    autocomplete: "new-password",
  },
  {
    id: "confirm_password",
    name: "confirm_password",
    label: "Пароль (еще раз)",
    type: "password",
    autocomplete: "new-password",
  },
];
