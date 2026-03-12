import { existsSync, readFileSync } from "fs";

export default class PageUtil {

    public static getPage(name: string): string {
        if (!existsSync(`src/pages/${name}.html`)) {
            return readFileSync(`src/pages/notFound.html`, {encoding: "utf-8"})
        }
        return readFileSync(`src/pages/${name}.html`, {encoding: "utf-8"})
    }

}