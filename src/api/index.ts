import path from "path"
import fs from "fs"
import { Express } from "express"

const routesDir = path.resolve(__dirname, "./")
const files = fs.readdirSync(routesDir, { recursive: true }) as string[]

export default function Deploy(app: Express) {
    for (const file of files) {
        if (!file.endsWith(".ts") && !file.endsWith(".js")) continue

        const moduleFile = require(path.join(routesDir, file))
        const mod = moduleFile.data

        if (!mod) {
            console.log(`[!] ${file} is missing data required to load.`)
            continue
        }

        const route = mod.route
        const method = mod.method?.toLowerCase() ?? "use"
        const handler = mod.handler
        const middleware = mod.middleware
        const stack = middleware
            ? Array.isArray(middleware)
                ? [...middleware, handler]
                : [middleware, handler]
            : [handler]

        switch (method) {
            case "get":
                app.get(route, ...stack)
                break
            case "post":
                app.post(route, ...stack)
                break
            case "patch":
                app.patch(route, ...stack)
                break
            default:
                app.use(route, ...stack)
                break
        }

        console.log(`[+] Loaded route: [${method.toUpperCase()}] ${route}`)
    }

    console.log(`[+] Loaded all api endpoints!`)
}