export const useUserInfo = () => {
  return useState("user", () => {
    return fetch("/api/user/").then((res) => res.json());
  });
};
