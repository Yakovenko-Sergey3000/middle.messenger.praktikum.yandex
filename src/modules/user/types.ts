import { UserType } from "@utils/global-types/index.ts";

export type SettingsUserType = {
  user: UserType;
};

export type ChangeUserProfileType = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};
