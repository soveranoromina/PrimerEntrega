import { validator } from "../domain/shared/Validator.js"
import { fileM } from "../infraestructure/repositories/FilesManipulator.js"
import { ProductFactory } from "../domain/factories/ProductFactory.js"

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        try {
            const products = await fileM.readFile(this.path)

            if (products.length === 0) throw new Error("No existen productos")

            return products

        } catch (error) {

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
            validator.isEmpty(object);

            const products = await this.getProducts();
            const id = validator.generateId(products);

            const productValidate = ProductFactory.create(id, object);
            const newProduct = { ...productValidate };
            products.push(newProduct)

            await fileM.writeFile(this.path, JSON.stringify(products, null, 2));

            return {
                product: newProduct,
                status: "created"
            };

        } catch (error) {
            throw error;
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

export const productManager = new ProductManager('./src/infraestructure/data/products.json')
