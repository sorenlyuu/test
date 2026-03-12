import { existsSync, mkdir, mkdirSync } from "fs";
import { Server } from "./server";
import ConfigUtil from "./util/config";
import UserData from "./util/user";
import multer from "multer";
import path from "path";
import Deploy from "./api";
import { Catbox, Litterbox } from "node-catbox";

const config = ConfigUtil.getConfig()
export const catbox = new Litterbox()
export const server = new Server(config)

if (!existsSync("data")) {
    mkdirSync("data")
    mkdirSync("data/files")
}

UserData.init()
Deploy(server.app)

