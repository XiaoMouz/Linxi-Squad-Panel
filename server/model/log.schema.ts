import { defineMongooseModel } from "#nuxt/mongoose";
import { Schema, Date } from "mongoose";

// import { hash } from 'bcrypt'

export const LogSchema = defineMongooseModel({
  name: "Log",
  schema: {
    location: {
      type: "string",
    },
    from: {
      type: "string",
    },
    message: {
      type: "string",
    },
    stack: {
      type: "string",
    },
    type: {
      type: "string",
    },
    createdAt: {
      type: Date,
    },
  },
  hooks(schema) {
    schema.pre("save", function (this, next) {
      if (this.location && this.message) next();

      throw createError({
        statusCode: 500,
        statusMessage: "validation failed",
      });
    });
  },
});
