import { UserSearch } from "lucide-vue-next";
import type { ObjectId, Schema } from "mongoose";
import { string } from "zod";

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  username: string;
  picture: string;
  role: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSessionData = {
  _id: "string",
  email: "string",
  username: "string",
  picture: "string",
};
