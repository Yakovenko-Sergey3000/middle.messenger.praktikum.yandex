import Validator from "./validator.js";

export type SignOutValidationType = {
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  password?: string;
  phone?: string;
};

export type SignOutValidationResponceType = {
  isValid: boolean;
  errors: { key: string; message: string }[];
};

export interface IChatValidator {
  userInformation(obj: SignOutValidationType): SignOutValidationResponceType;
}

class ChatValidator extends Validator implements IChatValidator {
  savedPassword: string;

  constructor() {
    super();

    this.savedPassword = "";
  }

  userInformation(obj: SignOutValidationType): SignOutValidationResponceType {
    const result: SignOutValidationResponceType = {
      isValid: true,
      errors: [],
    };

    Object.entries(obj).forEach(([key, value]) => {
      switch (key) {
        case "first_name":
          if (!this.isValidNameFormat(value)) {
            result.errors.push({
              key,
              message:
                "Используйте только буквы без пробелов и цифр, первая буква должны быть заглавной",
            });
          }
          break;
        case "second_name":
          if (!this.isValidNameFormat(value)) {
            result.errors.push({
              key,
              message:
                "Используйте только буквы без пробелов и цифр, первая буква должны быть заглавной",
            });
          }
          break;
        case "login":
          if (!this.isCorrectLogin(value)) {
            result.errors.push({
              key,
              message: `Должен содержать только латинские буквы, от 3 до 20 символов,
               без пробелов, дефисов и нижних подчёркиваний`,
            });
          }
          break;
        case "email":
          if (!this.isCorrectEmail(value)) {
            result.errors.push({
              key,
              message: "Некоректный email",
            });
          }
          break;
        case "phone":
          if (!this.isCorrectPhone(value)) {
            result.errors.push({
              key,
              message: "Телефон долже быть от 10 до 15 символов, состоять из цифр",
            });
          }
          break;
        case "password":
          if (!this.isCorrectPassword(value)) {
            result.errors.push({
              key,
              message: "Пароль должен быть от 8 до 40 символов и хотя бы одной заглавной буквы",
            });
          } else {
            this.savedPassword = value;
          }
          break;

        case "confirm_password":
          if (this.savedPassword !== value) {
            result.errors.push({
              key,
              message: "Пароли не совпадают",
            });
          }
          break;
        default:
      }
    });

    if (result.errors.length) {
      result.isValid = false;
    }

    return result;
  }
}

export default ChatValidator;
