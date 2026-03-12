import { Request, Response } from "express";
import HttpStatusCode from "../../types/status";
import { upload } from "../../util/multer";
import UserData from "../../util/user";

export const data = {
    route: "/api/upload",
    method: "POST",
    middleware: upload.single("file"),
    handler: handler,
};

function handler(req: Request, res: Response) {

    let token = req.headers.authorization
    if (!token) return res.status(HttpStatusCode.FORBIDDEN).send()
    token = token.split(" ")[1]
    if (!UserData.getUsers().find(s => s.token === token)) return res.status(HttpStatusCode.UNAUTHORIZED).send()
        
    if (!req.file) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            error: "No file uploaded"
        });
    }

    console.log("Uploaded file:", req.file.filename);

    res.status(HttpStatusCode.OK).json({
        success: true,
        filename: req.file.filename
    });
}
