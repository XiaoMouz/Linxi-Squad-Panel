import type { User } from "~/types/user.type";
export const useUserInfo = async () => {
  return await fetch("/api/user").then((res) => res.json());
};
