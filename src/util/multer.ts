import multer from "multer";
import { existsSync, mkdirSync } from "fs";

if (!existsSync("data/files")) mkdirSync("data/files", { recursive: true });

const storage = multer.diskStorage({
    destination: "data/files/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

export const upload = multer({ storage });
