import { readdirSync, statSync } from "fs";
import path from "path";
import { Request, Response } from "express";
import HttpStatusCode from "../../types/status";
import UserData from "../../util/user";
import PageUtil from "../../util/pages";

export const data = {
    route: "/view/:file",
    method: "GET",
    handler: handler,
}

function handler(req: Request, res: Response) {

    const token = req.cookies?.token;

    if (!token) {
        console.log(`[!] No token!`)
        return res.redirect("/login");
    }

    const user = UserData.getUsers().find(s => s.token === token)
    if (!user) {
        return res.redirect("/login")
    }

    console.log(`[+] Logged in with token cookie: ${token}`)
    res.send(PageUtil.getPage("view"))

}
