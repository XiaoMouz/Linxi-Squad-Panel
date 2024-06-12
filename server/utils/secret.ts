import bcrypt from "bcryptjs";

export const hash = (password: string) => {
  return bcrypt.hashSync(password, 10);
};
