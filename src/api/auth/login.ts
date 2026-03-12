import { Request, Response } from "express";
import PageUtil from "../../util/pages";
import UserData from "../../util/user";
import HttpStatusCode from "../../types/status";

export const data = {
    route: "/api/login",
    method: "POST",
    handler: handler
}
function handler(req: Request, res: Response) {

    const data = req.body
    console.log(`[+] New login request from ${data.username}`)

    const user = UserData.getUser(data.username)
    if (!user) return res.status(HttpStatusCode.UNAUTHORIZED).send()
    if (atob(user.password) !== data.password) return res.status(HttpStatusCode.UNAUTHORIZED).send()

    return res.status(HttpStatusCode.OK).json(user)

}