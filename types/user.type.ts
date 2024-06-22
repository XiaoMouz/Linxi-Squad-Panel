import type { Role } from "./role.type";

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role[];
}

export const UserSessionData = {
  id: "string",
  email: "string",
  username: "string",
  picture: "string",
  role: "string[]",
};
