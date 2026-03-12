import { readdirSync, statSync } from "fs";
import path from "path";
import { Request, Response } from "express";
import HttpStatusCode from "../../types/status";
import UserData from "../../util/user";

export const data = {
    route: "/api/files",
    method: "GET",
    handler: handler,
}

function handler(req: Request, res: Response) {

    let token = req.headers.authorization
    if (!token) return res.status(HttpStatusCode.FORBIDDEN).send()
    token = token.split(" ")[1]
    if (!UserData.getUsers().find(s => s.token === token)) return res.status(HttpStatusCode.UNAUTHORIZED).send()
    const folder = "data/files"
    const files = readdirSync(folder)

    const imageExtensions = ["png", "jpg", "jpeg", "gif", "webp"]
    const videoExtensions = ["mp4", "mov", "wmv", "avi"]

    const fileData = files.map(f => {
        const filePath = path.join(folder, f)
        const stats = statSync(filePath)
        const ext = path.extname(f).toLowerCase().replace(".", "")
        const type = imageExtensions.includes(ext) 
        ? "image"
        : videoExtensions.includes(ext) ? "video" : "file"
        return {
            url: `/files/${encodeURIComponent(f)}`,
            name: f,
            uploadedAt: stats.birthtime,
            type: type,
            size: stats.size
        }
    })

    res.json(fileData)
}
