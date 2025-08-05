class Validator {

    generateId(items) {
        const ids = items.map(item => item.id);
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }

    isEmpty(object) {
        if (!object) throw new Error("Debes enviar por lo menos un valor")
    }

    validateMissingFields(items) {
        for (const [key, value] of Object.entries(items)) {
            if (!value) throw new Error(`Falta el campo ${key}`)
        }
    }

    validateString(key, value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error(`El campo '${key}' debe ser un string no vacío`);
        }
    }

    validateNumber(key, value) {
        if (typeof value !== "number") {
            throw new Error(`El campo '${key}' debe ser un number`);
        }
    }

    validateBoolean(key, value) {
        if (typeof value !== "boolean") {
            throw new Error(`El campo '${key}' debe ser un boleano`);
        }
    }

    validateArray(key, value) {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error(`El campo '${key}' debe ser de tipo Array`);
        }
    }

}
export const validator = new Validator()