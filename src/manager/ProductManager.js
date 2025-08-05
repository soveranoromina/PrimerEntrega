import fs from "fs";
import { validator } from "./validations/Validator.js"

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(products);
            }
        } catch (error) {
            throw error
        }
    }

    getProductById = async (id) => {
        try {
            console.log(id)
            const products = await this.getProducts();
            const product = products.find((p) => p.id === Number(id));
            if (!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error) {
            throw error;
        }
    }

    addProduct = async (object) => {
        try {
            validator.isEmpty(object)
            const { title, description, code, price, status, stock, category, thumbnails } = object;
            const product_values = { title, description, code, price, status, stock, category, thumbnails };
            validator.validateMissingFields(product_values)

            for (const [key, value] of Object.entries(object)) {
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

            const products = await this.getProducts();
            const id = validator.generateId(products);

            const product = {
                id: id,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            }

            products.push(product)

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            return {
                product,
                status: "created"
            }
        } catch (error) {
            throw error
        }

    }

    updateProduct = async (id, object) => {
        try {

            validator.isEmpty(object)
            if ('id' in object) throw new Error("No se puede modificar el campo 'id'");

            for (const [key, value] of Object.entries(object)) {
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

            const products = await this.getProducts();
            const product = await this.getProductById(id)

            const i = products.findIndex(p => p.id === Number(id));
            const productExist = { ...products[i], ...object };
            products[i] = productExist;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

            return {
                productExist,
                status: "updated"
            }

        } catch (error) {
            throw error;
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts();
            const product = await this.getProductById(id);
            const newArray = products.filter((u) => u.id !== Number(id));
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return {
                id: id,
                status: "deleted"
        }
        } catch (error) {
            throw error;
        }
    }

}

export const productManager = new ProductManager('./src/data/products.json')
