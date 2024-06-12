import type { ObjectId, Schema } from "mongoose";

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  username: string;
  role: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
