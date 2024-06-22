import type { Role } from "~/types/role.type";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await useUserInfo();

  if (
    !(user.role === undefined) &&
    user.role?.some((role: Role) => role.super_role || role.maintainer)
  ) {
    return;
  } else {
    return navigateTo("/");
  }
});
