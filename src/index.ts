import { Elysia } from "elysia";
import { hotUpdater } from "./hot-updater";
import { configure, getConsoleSink} from "@logtape/logtape";
import { elysiaLogger } from "@logtape/elysia";
import { getFileSink } from "@logtape/file";

await configure({
  sinks: { console: getConsoleSink(), file: getFileSink("app.log") },
  loggers: [
    { category: ["elysia"], sinks: ["console", "file"], lowestLevel: "info",}
  ],
});

const app = new Elysia() 
.use(elysiaLogger({
  format:"combined",
  level: "info",
}))
.mount("/hot-updater", hotUpdater.handler)
.listen(process.env.PORT ?? 3000) 

console.log(
  `Server is running at ${app.server?.hostname}:${app.server?.port}`
);
