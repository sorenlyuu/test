import { Request, Response } from "express";
import PageUtil from "../../util/pages";
import UserData from "../../util/user";

export const data = {
    route: "/",
    method: "GET",
    handler
};

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
    res.send(PageUtil.getPage("home"))
}
