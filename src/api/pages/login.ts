import { Request, Response } from "express";
import { readFileSync } from "fs";
import PageUtil from "../../util/pages";

export const data = {
    route: "/login",
    method: "GET",
    handler: handler
}
function handler(req: Request, res: Response) {

    res.send(PageUtil.getPage("login"))

}