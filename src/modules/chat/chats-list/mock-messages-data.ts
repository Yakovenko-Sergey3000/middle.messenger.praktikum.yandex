import { UiChatItemType } from "@ui/chat-item/index.ts";
import { USERS } from "../../../enums.ts";

export const chatsList: UiChatItemType[] = [
  {
    id: 1,
    title: "Sergey",
    last_message: {
      user: USERS[0],
      time: String(new Date("2024-10-22")),
      content: "Lorem Ipsum is simply dummy text...",
    },
    unread_count: 2,
    avatar: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg",
  },
  {
    id: 2,
    title: "Alex",
    last_message: {
      user: USERS[1],
      time: String(new Date("2024-10-22")),
      content: "Lorem Ipsum is simply dummy text...",
    },
    unread_count: 1,
    avatar: "",
  },
  {
    id: 3,
    title: "Sergey",
    last_message: {
      user: USERS[0],
      time: String(new Date("2024-10-22")),
      content: "Lorem Ipsum is simply dummy text...",
    },
    unread_count: 0,
    avatar:
      // eslint-disable-next-line max-len
      "https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-images-of-winter-and-white-background-wallpapers-free-download-image_2935697.jpg",
  },
  {
    id: 4,
    title: "Alex",
    last_message: {
      user: USERS[1],
      time: String(new Date("2024-10-22")),
      content: "Lorem Ipsum is simply dummy text...",
    },
    unread_count: 3,
    avatar: "",
  },
  {
    id: 1,
    title: "Sergey",
    last_message: {
      user: USERS[0],
      time: String(new Date("2024-10-22")),
      content: "Lorem Ipsum is simply dummy text...",
    },
    unread_count: 0,
    avatar: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg",
  },
  {
    id: 2,
    title: "Alex",
    last_message: {
      user: USERS[1],
      time: String(new Date("2024-10-22")),
      content: "Lorem Ipsum is simply dummy text...",
    },
    unread_count: 0,
    avatar: "",
  },
];
