import { createConsola } from "consola";

const log = createConsola({
  level: useRuntimeConfig().logLevel || 3,

});
