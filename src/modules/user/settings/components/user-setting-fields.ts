import { UserType } from "../../../../utils/global-types/index.ts";

export const USER_SETTING_FIELDS = [
  {
    label: "Почта",
    name: "email" as keyof UserType,
  },
  {
    label: "Логин",
    name: "login" as keyof UserType,
  },
  {
    label: "Имя",
    name: "first_name" as keyof UserType,
  },
  {
    label: "Фамилия",
    name: "second_name" as keyof UserType,
  },
  {
    label: "Имя в чате",
    name: "display_name" as keyof UserType,
  },
  {
    label: "Телефон",
    name: "phone" as keyof UserType,
  },
];
