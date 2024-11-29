import { ChangePasswordType, SignInType } from "@modules/auth/types.ts";
import Validator from "./validator.ts";

export type SignOutValidationType = {
  email?: string;
  login?: string;
  first_name?: string;
  second_name?: string;
  password?: string;
  phone?: string;
};

export type SignInValidationType = {
  login?: string;
  password?: string;
};

export type ValidationResponceType = {
  isValid: boolean;
  errors: { key: string; message: string }[];
};

export interface IChatValidator {
  userInformation(obj: SignOutValidationType): ValidationResponceType;
  signIn(obj: SignInValidationType): ValidationResponceType;
}

class ChatValidator extends Validator implements IChatValidator {
  savedPassword: string;

  constructor() {
    super();

    this.savedPassword = "";
  }

  signIn(obj: SignInType): ValidationResponceType {
    const result: ValidationResponceType = {
      isValid: true,
      errors: [],
    };

    Object.entries(obj).forEach(([key, value]) => {
      switch (key) {
        case "login":
          if (!this.isEmptyString(value)) {
            result.errors.push({
              key,
              message: "Поле не может быть пустым",
            });
          }
          break;
        case "password":
          if (!this.isEmptyString(value)) {
            result.errors.push({
              key,
              message: "Поле не может быть пустым",
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

  changePassword(obj: ChangePasswordType): ValidationResponceType {
    const result: ValidationResponceType = {
      isValid: true,
      errors: [],
    };

    Object.entries(obj).forEach(([key, value]) => {
      switch (key) {
        case "oldPassword":
          if (!this.isEmptyString(value)) {
            result.errors.push({
              key,
              message: "Поле не может быть пустым",
            });
          }
          break;
        case "newPassword":
          if (!this.isCorrectPassword(value)) {
            result.errors.push({
              key,
              message: "Пароль должен быть от 8 до 40 символов и хотя бы одной заглавной буквы",
            });
          } else {
            this.savedPassword = value;
          }
          break;
        case "confirmPassword":
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

  userInformation(obj: SignOutValidationType): ValidationResponceType {
    const result: ValidationResponceType = {
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
