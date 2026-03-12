import { existsSync, readdirSync, statSync } from "fs";
import path from "path";
import { Request, Response } from "express";
import HttpStatusCode from "../../types/status";
import UserData from "../../util/user";
import { catbox } from "../..";

export const data = {
    route: "/api/file/catbox",
    method: "POST",
    handler: handler,
}
function handler(req: Request, res: Response) {
    const file = req.body.file
    const tokenHeader = req.headers.authorization
    if (!tokenHeader) return res.status(HttpStatusCode.FORBIDDEN).send()
    const token = tokenHeader.split(" ")[1]
    if (!token || !UserData.getUsers().find(s => s.token === token)) {
        return res.status(HttpStatusCode.UNAUTHORIZED).send()
    }

    const filePath = path.join("data/files", file)
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
        return res.status(HttpStatusCode.NOT_FOUND).send("File not found")
    }

    console.log(`[+] Uploading ${file}...`)
    catbox.uploadFile({ path: filePath, duration: "24h" })
        .then(url => {
            console.log(`[+] Uploaded! URL: ${url}`)
            res.send(url)
        })
        .catch(err => {
            console.error(`[!] Upload error:`, err)
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send()
        })
}

