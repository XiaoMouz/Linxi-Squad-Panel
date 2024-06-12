// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-security",
    "nuxt-mongoose",
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
  },
  mongoose: {
    uri: process.env.NUXT_MONGOOSE_URI,
    options: {
      bufferCommands: true,
      autoIndex: true,
      autoCreate: true,
    },
    modelsDir: "models",
    devtools: true,
  },
  security: {
    headers: {
      // allow DevTools
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
    },
  },
  shadcn: {},
  auth: {
    baseURL: "/api/user",
    provider: {
      type: "local",
      endpoints: {},
    },
  },
  googleFonts: {
    families: {
      "Noto+Sans+SC": true,
      Roboto: true,
    },
  },
});
