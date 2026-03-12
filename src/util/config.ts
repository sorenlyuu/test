import * as fs from "fs"
import { ConfigInterface } from "../types/config"

export default class ConfigUtil {

    public static createConfig(): ConfigInterface {
        console.log("[+] Creating a new config.json...")
        const config: ConfigInterface = {
            host: {
                ip: "0.0.0.0",
                port: 80
            },
            administratorIPs: []
        }
        fs.writeFileSync("config.json", JSON.stringify(config, null, 4))
        return config
    }

    public static getConfig(): ConfigInterface {
        if (!fs.existsSync("config.json")) this.createConfig();
        return JSON.parse(fs.readFileSync("config.json", { encoding: "utf-8" }))
    }

    public static updateConfig(fields: Map<keyof ConfigInterface, any>): ConfigInterface {
        let config = this.getConfig()

        console.log(`[+] Updating config: ${JSON.stringify(fields)}`)
        for (const [key, value] of fields.entries()) {
            (config as any)[key] = value
        }

        fs.writeFileSync("config.json", JSON.stringify(config, null, 4))
        return config
    }

}