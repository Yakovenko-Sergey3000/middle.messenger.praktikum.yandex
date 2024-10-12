import { uiUnStyledInput } from "@ui/inputs/index.js";

export const VIEW_FIELDS_INFO = [
  {
    left_text: "Старый пароль",
    right_partial: uiUnStyledInput({
      value: "12345",
      type: "password",
      className: "un-styled-input_begin-right",
      name: "oldPassword",
    }),
  },
  {
    left_text: "Новый пароль",
    right_partial: uiUnStyledInput({
      value: "12345",
      type: "password",
      className: "un-styled-input_begin-right",
      name: "newPassword",
    }),
  },
  {
    left_text: "Повторите новый пароль",
    right_partial: uiUnStyledInput({
      value: "12345",
      type: "password",
      className: "un-styled-input_begin-right",
      name: "confirmPassword",
    }),
  },
];
