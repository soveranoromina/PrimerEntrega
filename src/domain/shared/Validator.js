class Validator {

/**
 * Genera un id autoincremental tomando el ultimo elemento del `ID` del array.
 *
 * @param {Array<Object>} items - Array de objetosque debe contener `ID` de tipo number.
 * @returns {number} Suma 1 al ultimo `ID` encontrado, sino devuelve 1.
 */
    generateId(items) {
        const ids = items.map(item => item.id);
        return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }
/**
 * Valida si el objeto recibido está vacío.
 *
 * @param {JSON<Object>} object - JSON recibido.
 */
    isEmpty(object) {
        if (!object) throw new Error("Debes enviar por lo menos un valor")
    }

/**
 * Valida si falta ingresar algún campo.
 *
 * @param {JSON<Object>} fields - JSON recibido.
 */

    validateMissingFields(fields) {
        for (const [key, value] of Object.entries(fields)) {
            if (!value) throw new Error(`Falta el campo ${key}`)
        }
    }
/**
 * Valida si el tipo de dato es string.
 *
 * @param {JSON<Object>} fields - JSON recibido.
 */
    validateString(key, value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error(`El campo '${key}' debe ser un string no vacío`);
        }
    }
/**
 * Valida si el tipo de dato es number.
 *
 * @param {JSON<Object>} fields - JSON recibido.
 */
    validateNumber(key, value) {
        if (typeof value !== "number") {
            throw new Error(`El campo '${key}' debe ser un number`);
        }
    }
/**
 * Valida si el tipo de dato es boolean.
 *
 * @param {JSON<Object>} fields - JSON recibido.
 */
    validateBoolean(key, value) {
        if (typeof value !== "boolean") {
            throw new Error(`El campo '${key}' debe ser un boleano`);
        }
    }
/**
 * Valida si el tipo de dato es array.
 *
 * @param {JSON<Object>} fields - JSON recibido.
 */
    validateArray(key, value) {
        if (!Array.isArray(value) || value.length === 0) {
            throw new Error(`El campo '${key}' debe ser de tipo Array`);
        }
    }

}
export const validator = new Validator()