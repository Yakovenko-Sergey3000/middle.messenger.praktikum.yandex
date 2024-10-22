import { uiButtonLink } from "@ui/buttons/index.js";

export const VIEW_FIELDS_INFO = [
  {
    left_text: "Почта",
    right_text: "pochta@yandex.ru",
  },
  {
    left_text: "Логин",
    right_text: "ivanivanov",
  },
  {
    left_text: "Имя",
    right_text: "Иван",
  },
  {
    left_text: "Фамилия",
    right_text: "Иванов",
  },
  {
    left_text: "Имя в чате",
    right_text: "Иван",
  },
  {
    left_text: "Телефон",
    right_text: "+7 (909) 967 30 30",
  },
];

export const VIEW_ACTIONS = [
  {
    left_partial: uiButtonLink({
      label: "Изменить данные",
    }),
  },
  {
    left_partial: uiButtonLink({
      label: "Изменить пароль",
    }),
  },
  {
    left_partial: uiButtonLink({
      label: "Выйти",
      className: "button-link_red",
    }),
  },
];
