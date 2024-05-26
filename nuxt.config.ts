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
  runtimeConfig:{
  
  },
  mongoose: {
    uri: 'mongodb://debuger:8312938901@b1s-linux.eastasia.cloudapp.azure.com:27017/?directConnection=true&authSource=debug',
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
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',

    },
  },
  shadcn: {},
  auth:{
    provider:{
      type: 'local',
    }
  }
});