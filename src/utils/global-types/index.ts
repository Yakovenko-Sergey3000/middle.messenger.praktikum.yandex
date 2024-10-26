// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export type ComponentType = {
  className?: string;
  attributes?: Record<string, Any>;
};

export type ComponentEventsType = {
  onClick?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
};

export type UserType = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};
