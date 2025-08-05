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

    addProduct = async (object) => {
        try {
            validator.isEmpty(object)
            const { title, description, code, price, stock, category, thumbnails } = object;
            const product_values = { title, description, code, price, stock, category, thumbnails };
            validator.validateMissingFields(product_values)
            validator.validateString("title", product_values.title);
            validator.validateString("description", product_values.description);
            validator.validateString("code", product_values.code);
            validator.validateNumber("price", product_values.price);
            validator.validateNumber("stock", product_values.stock);
            validator.validateString("category", product_values.category);
            validator.validateArray("thumbnails", product_values.thumbnails)


            const products = await this.getProducts();
            const id = validator.generateId(products);

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
