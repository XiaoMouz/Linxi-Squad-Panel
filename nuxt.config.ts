// https://nuxt.com/docs/api/configuration/nuxt-config
import { UserSessionData } from "./types/user.type";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-security",
    "@nuxt/devtools",
    "@sidebase/nuxt-auth",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
  ],
  ssr: false,
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    password: "password1",
    logLevel: 5,
    secret: "djawiodj12-=0",
    db: process.env.NUXT_MONGODB_URI,
  },
  security: {
    headers: {
      // allow DevTools
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
      // allow image from anywhere
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "img-src": ["'self'", "data:", "*"],
      },
    },
  },
  shadcn: {},
  auth: {
    baseURL: "http://localhost:3000/api/user",
    provider: {
      type: "local",
      endpoints: {},
      pages: {
        login: "/account/login",
      },
      sessionDataType: UserSessionData,
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },
  googleFonts: {
    families: {
      "Noto+Sans+SC": true,
      Roboto: true,
    },
  },
});
