import { validator } from "../shared/Validator.js";

export class ProductEntity {
    constructor(id, {title, description, code, price, status, stock, category, thumbnails }) {

        const fields = { title, description, code, price, status, stock, category, thumbnails }

        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;

        validator.validateMissingFields(fields);
        this.validateDataTypes(fields)
        this.validateCategory(category);
        this.validatePrice(price)
    }

    validateCategory(category) {
        const categories = ["Alimentos", "Bebidas", "Higiene", "Limpieza", "Cosmetica", "Ropa", "Juguetes"];
        if (!categories.includes(category)) {
            throw new Error(`La categoría debe ser una de las siguientes: ${categories.join(', ')}`);
        }
    }

    validatePrice(price) {
        if (price < 0) throw new Error('El precio del producto debe ser mayor a 0');
    }

    validateDataTypes(fields) {
        for (const [key, value] of Object.entries(fields)) {
            if (["title", "description", "code", "category"].includes(key)) {
                validator.validateString(key, value);
            }
            if (["price", "stock"].includes(key)) {
                validator.validateNumber(key, value);
            }
            if (key === "thumbnails") {
                validator.validateArray(key, value);
            }
            if (key === "status") {
                validator.validateBoolean(key, value);
            }
        }
    }
}
