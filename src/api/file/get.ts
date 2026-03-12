import { existsSync, readdirSync, statSync } from "fs";
import path from "path";
import { Request, Response } from "express";
import HttpStatusCode from "../../types/status";
import UserData from "../../util/user";

export const data = {
    route: "/api/file/:file",
    method: "GET",
    handler: handler,
}

function handler(req: Request, res: Response) {

    let token = req.headers.authorization
    if (!token) return res.status(HttpStatusCode.FORBIDDEN).send()
    token = token.split(" ")[1]
    if (!UserData.getUsers().find(s => s.token === token)) return res.status(HttpStatusCode.UNAUTHORIZED).send()
    const fileName = req.params.file
    const filePath = `data/files/${fileName}`
    if (!fileName) return res.status(HttpStatusCode.BAD_REQUEST).send()
    if (!existsSync(filePath)) return res.status(HttpStatusCode.NOT_FOUND).send()
    const imageExtensions = ["png", "jpg", "jpeg", "gif", "webp"]
    const videoExtensions = ["mp4", "mov", "wmv", "avi"]
    const stats = statSync(filePath)
    const ext = path.extname(fileName).toLowerCase().replace(".", "")
    const type = imageExtensions.includes(ext)
        ? "image"
        : videoExtensions.includes(ext) ? "video" : "file"

    const fileData = {
        url: `/files/${encodeURIComponent(fileName)}`,
        name: fileName,
        uploadedAt: stats.birthtime,
        type: type,
        size: stats.size
    }
    res.json(fileData)

}
