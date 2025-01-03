export type ChatUsersType = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
};

export type DeleteChatType = {
  result: {
    id: number;
    title: string;
    avatar: string | null;
    created_by: number;
  };
  userId: number;
};

export type ChatTokenType = {
  token: string;
};
