import fs from "fs";

class WorkWithFiles {
    readFile = async (path) => {
            if (!fs.existsSync(path)) throw new Error("Base no encontrada");
            const data = await fs.promises.readFile(path, "utf-8");
            return JSON.parse(data);
    }

    writeFile = async (path, object) => {
            if (!fs.existsSync(path)) throw new Error("Base no encontrada");
            await fs.promises.writeFile(path, object, "utf-8");
            return object
    }
}

export const workWithfile = new WorkWithFiles()