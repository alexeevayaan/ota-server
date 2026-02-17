import { Elysia } from "elysia";
import { hotUpdater } from "./hot-updater";
import { cors } from '@elysiajs/cors'
import { rateLimit } from 'elysia-rate-limit'
import { Logestic } from 'logestic';

const app = new Elysia() 
.use(cors({
    "origin":"*"
}))
.use(rateLimit())
.use(Logestic.preset('common'))
.mount("/hot-updater", hotUpdater.handler)
.listen(process.env.PORT ?? 3000) 

console.log(
  `Server is running at ${app.server?.hostname}:${app.server?.port}`
);
