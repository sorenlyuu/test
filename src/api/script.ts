import { Request, Response } from "express"
import { existsSync, readFileSync, rmSync } from "fs"
import { join, resolve } from "path"
import { tmpdir } from "os"
import crypto from "crypto"
import HttpStatusCode from "../types/status"
import * as esbuild from "esbuild"

export const data = {
    route: "/scripts/:script",
    method: "GET",
    handler
}

function handler(req: Request, res: Response) {
    const script = req.params.script
    if (!script) return res.status(HttpStatusCode.BAD_REQUEST).send()

    const extension = script.split(".").pop() ?? ""
    const name = script.slice(0, -extension.length - 1)
    const sourcePath = resolve(join("src/pages/scripts", `${name}.ts`))
    // console.log(`[?] GET ${script}`, { name, sourcePath })

    if (!existsSync(sourcePath)) {
        return res.status(HttpStatusCode.NOT_FOUND).send()
    }
    const outputFile = join(tmpdir(), `${name}-${crypto.randomUUID()}.js`)

    try {
        esbuild.buildSync({
            entryPoints: [sourcePath],
            outfile: outputFile,
            bundle: false,
            platform: "browser",
            sourcemap: false,
        })
        if (!existsSync(outputFile)) {
            console.error(`[!] ${outputFile} is missing!`)
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send()
        }
        const content = readFileSync(outputFile, "utf-8")
        res.type("application/javascript").send(content)
        // console.log(`[?] Sent ${outputFile}`, content)
    } catch (err) {
        console.error("[!]", err)
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send()
    } finally {
        if (existsSync(outputFile)) rmSync(outputFile, { force: true })
    }

}
