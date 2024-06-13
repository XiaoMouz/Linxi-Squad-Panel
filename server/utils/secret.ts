import bcrypt from "bcryptjs";

export const hash = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const compare = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
