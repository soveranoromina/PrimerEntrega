import fs from "fs";

class FilesManipulator {
    readFile = async (path) => {
        try {

            if (!fs.existsSync(path)) throw new Error("Base no encontrada");

            const data = await fs.promises.readFile(path, "utf-8");
            return JSON.parse(data);

        } catch (error) {
            throw error
        }
    }

    writeFile = async (path, object) => {
        try {
            this.readFile(path)
            await fs.promises.writeFile(path, object, "utf-8");
            return object

        } catch (error) {
            throw error
        }
    }
}

export const fileM = new FilesManipulator()