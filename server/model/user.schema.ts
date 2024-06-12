import { defineMongooseModel } from "#nuxt/mongoose";
import { Schema, Date } from "mongoose";

// import { hash } from 'bcrypt'

export const UserSchema = defineMongooseModel({
  name: "User",
  schema: {
    email: {
      type: "string",
      unique: true,
    },
    password: {
      type: "string",
    },
    username: {
      type: "string",
    },
    role: {
      type: Schema.Types.ObjectId,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      if (this.password && this.email) next();

      throw createError({
        statusCode: 500,
        statusMessage: "validation failed",
      });
    });
  },
});
