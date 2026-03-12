import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConfigInterface } from "./types/config";

export class Server {
    public readonly app;
    public readonly webServer;

    constructor(config: ConfigInterface) {
        this.app = express();
        this.app.use(express.json({ limit: "500mb" }));
        this.app.use(cors({ origin: "*" }));
        this.app.use("/style", express.static("src/pages/style"));
        this.app.use("/fonts", express.static("src/pages/fonts"));
        this.app.use("/files", express.static("data/files"));
        this.app.use(cookieParser());

        this.webServer = http.createServer(this.app);

        this.webServer.listen(config.host.port, config.host.ip, () => {
            console.log(`[+] Server listening at ${config.host.ip}:${config.host.port}`);
        });
    }
}
