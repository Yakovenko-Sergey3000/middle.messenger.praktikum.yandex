class Validator {
  isValidNameFormat(value: string): boolean {
    const regex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;

    return regex.test(value);
  }

  isCorrectLogin(login: string): boolean {
    const regex = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;

    return regex.test(login);
  }

  isCorrectEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+(\.[a-zA-Z]{2,})+$/;

    return regex.test(email);
  }

  isCorrectPhone(phone: string): boolean {
    const regex = /^\+?\d{10,15}$/;

    return regex.test(phone);
  }

  isCorrectPassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

    return regex.test(password);
  }
}

export default Validator;
