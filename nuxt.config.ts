// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-security",
    "nuxt-mongoose",
    "@nuxt/devtools",
    "@sidebase/nuxt-auth"
  ],
  mongoose: {
    uri: "process.env.MONGODB_URI",
    options: {
      bufferCommands: true,
      dbName: "process.env.MONGODB_DBNAME",
      user: "process.env.MONGODB_USER",
      pass: "process.env.MONGODB_PASSWORD",
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
});