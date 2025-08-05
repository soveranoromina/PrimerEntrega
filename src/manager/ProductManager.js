import fs from "fs";
import { idManager } from "./validations/IdManager.js";

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                console.log(products)
                return JSON.parse(products);
            }
        } catch (error) {
            throw error
        }
    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts();
            const product = products.find((p) => p.id === Number(id));
            if (!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error) {
            throw error;
        }
    }

    addProduct = async (obj) => {
        try {
             if (!obj) throw new Error("Debes enviar por lo menos un valor")
            const { title, description, code, price, stock, category, thumbnails } = obj;
            const product_values = { title, description, code, price, stock, category, thumbnails };

            const products = await this.getProducts();
            const id = idManager.generate(products);

            for (const [key, value] of Object.entries(product_values)) {
                if (!value) {
                    return `Falta el campo ${key}`
                }
            }

            const product = {
                id: id,
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnails
            }

            products.push(product)

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            return {
                message: `El producto de ID ${product.id} ha sido creado con éxito`
            }
        } catch (error) {
            throw error
        }

    }

    updateProduct = async (id, updatedProduct) => {
        try {
            if (updatedProduct === null) throw new Error("Debe ingresar al menos un campo para modificar")
            if ('id' in updatedProduct) throw new Error("No se puede modificar el campo 'id'");

            const products = await this.getProducts();
            const product = await this.getProductById(id)

            const i = products.findIndex(p => p.id === Number(id));
            const productExist = { ...products[i], ...updatedProduct };
            products[i] = productExist;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

            return productExist;

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
                message: `El producto con ID ${id} ha sido eliminado`
            }
        } catch (error) {
            throw error;
        }
    }

}

export const productManager = new ProductManager('./src/data/products.json')
