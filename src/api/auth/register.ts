import { Request, Response } from "express";
import PageUtil from "../../util/pages";
import UserData from "../../util/user";
import HttpStatusCode from "../../types/status";
import ConfigUtil from "../../util/config";
import { json } from "stream/consumers";

export const data = {
    route: "/api/register",
    method: "POST",
    handler: handler
}
function handler(req: Request, res: Response) {

    const data = req.body
    console.log(`[+] Register request ${data.username}`)

    if (!req.ip) return

    const ip = req.ip
    const ips = req.ips
    let check = false
    const administratorIPs = ConfigUtil.getConfig().administratorIPs
    if (administratorIPs.includes(ip)) {
        check = true
    }
    if (ips.some(s => administratorIPs.includes(s))) {
        check = true
    }
    if (!check) return res.status(HttpStatusCode.FORBIDDEN).send()

    const user = UserData.createNewUser(data.username, data.password)
    return res.status(200).json(user)

}