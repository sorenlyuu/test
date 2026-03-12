import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { UserInterface } from "../types/data";
import { randomUUID } from "crypto";

export default class UserData {
    
    public static init() {
        if (!existsSync("data")) mkdirSync("data");
        if (!existsSync("data/users.json")) {
            writeFileSync("data/users.json", "[]")
        }
    }

    public static getUsers(): UserInterface[] {
        return JSON.parse(readFileSync("data/users.json", {encoding: "utf-8"}))
    }

    public static getUser(username: string): UserInterface | undefined {
        const users = this.getUsers()
        const user = users.find(s => s.username === username)
        return user
    }

    public static createNewUser(username: string, password: string): UserInterface {
        const passwordEncoded = Buffer.from(password).toString("base64")
        const existing = this.getUser(username)
        if (existing) return existing
        const user: UserInterface = {
            username,
            password: passwordEncoded,
            token: randomUUID()
        }
        console.log(`[+] Created user ${username}`)
        this.saveUserData(user)
        return user
    }

    public static saveUserData(data: UserInterface): UserInterface[] {
        const users = this.getUsers()
        const existindInd = users.findIndex(s => s.username === data.username)
        if (existindInd !== -1) {
            users[existindInd] = data
        } else {
            users.push(data)
        }
        writeFileSync("data/users.json", JSON.stringify(users, null, 4))
        return users
    }

}