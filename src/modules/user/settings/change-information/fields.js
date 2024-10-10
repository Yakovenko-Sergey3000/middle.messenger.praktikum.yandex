import { uiUnStyledInput } from "@ui/inputs/index.js";

export const VIEW_FIELDS_INFO = [
  {
    left_text: "Почта",
    right_partial: uiUnStyledInput({
      value: "pochta@yandex.ru",
      className: "un-styled-input_begin-right",
    }),
  },
  {
    left_text: "Логин",
    right_partial: uiUnStyledInput({
      value: "ivanivanov",
      className: "un-styled-input_begin-right",
    }),
  },
  {
    left_text: "Имя",
    right_partial: uiUnStyledInput({
      value: "Иван",
      className: "un-styled-input_begin-right",
    }),
  },
  {
    left_text: "Фамилия",
    right_partial: uiUnStyledInput({
      value: "Иванов",
      className: "un-styled-input_begin-right",
    }),
  },
  {
    left_text: "Имя в чате",
    right_partial: uiUnStyledInput({
      value: "Иван",
      className: "un-styled-input_begin-right",
    }),
  },
  {
    left_text: "Телефон",
    right_partial: uiUnStyledInput({
      value: "+7 (909) 967 30 30",
      className: "un-styled-input_begin-right",
    }),
  },
];
