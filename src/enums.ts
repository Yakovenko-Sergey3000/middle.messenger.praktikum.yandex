import { UserType } from "./utils/global-types/index.ts";

export const USERS: UserType[] = [
  {
    id: 1,
    display_name: "Sergey Yakovenko",
    login: "login",
    avatar:
      // eslint-disable-next-line max-len
      "https://img2.kapital.kz/NdKFPmYmbsM/rs:auto:1200:748:1:0/g:sm/czM6Ly9rYXBpdGFsLXN0YXRpYy9pbWcvNC9hL2UvOC9hLzBmNmEwNWM5MWMxMWRkYzUyODMyY2FjNDA1ZC5qcGc",
    second_name: "Yakovenko",
    first_name: "Sergey",
    email: "email@gmail.com",
    phone: "9393-3032-3",
  },
  {
    id: 2,
    display_name: "Alex Bond",
    login: "login",
    avatar: "",
    second_name: "Bond",
    first_name: "Alex",
    email: "email@gmail.com",
    phone: "9393-3032-3",
  },
];

export const HTTPS_STATUS = {
  OK: 200,
  CREATED: 201,
};
