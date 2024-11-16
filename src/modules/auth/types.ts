export type AuthFieldType = {
  id: string;
  name: string;
  label: string;
  type?: string;
  autocomplete?: string;
};

export type SignUpType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignInType = {
  login: string;
  password: string;
};

export type ApiAuthResponce = {
  status: number;
  response: string;
};
