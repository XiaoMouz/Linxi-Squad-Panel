import { UserSearch } from "lucide-vue-next";
import { string } from "zod";

export interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSessionData = {
  _id: "string",
  email: "string",
  username: "string",
  picture: "string",
};
