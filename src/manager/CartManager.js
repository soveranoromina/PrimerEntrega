import fs from "fs";
import { idManager } from "./validations/IdManager.js";

class CartManager {
    constructor(path) {
        this.path = path
    }

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, "utf-8");
                console.log(carts)
                return JSON.parse(carts);
            }
        } catch (error) {
            throw error
        }
    }

    getProductsFromCart = async (id) => {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((c) => c.id === Number(id));
            if (!cart) throw new Error("Producto no encontrado");
            return cart.products;
        } catch (error) {
            throw error;
        }
    }

    createCart = async (obj) => {

        try {
            if (!obj) throw new Error("Debes enviar por lo menos un valor")
            const { products } = obj
            const cart_values = { products }

            const carts = await this.getCarts();
            console.log(carts)
            const id = idManager.generate(carts);

            for (const [key, value] of Object.entries(cart_values)) {
                if (!value) {
                    return `Falta el campo ${key}`
                }
            }

            const cart = {
                id: id,
                products
            }

            carts.push(cart)

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return {
                message: `El carrito de ID ${cart.id} ha sido creado con éxito`
            }
        } catch (error) {
            throw error
        }
    }

addProductToCart = async (idCart, idProduct) => {
    try {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(c => c.id === Number(idCart));

        if (cartIndex === -1) throw new Error("Carrito no encontrado");

        const cart = carts[cartIndex];

        const product = cart.products.find(p => p.id === Number(idProduct));

        if (product) {
             product.quantity += 1;
        } else {
            cart.products.push({
                id: Number(idProduct),
                quantity: 1
            });
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

        return {
            message: `Producto ${idProduct} agregado al carrito ${idCart}`
        };

    } catch (error) {
        throw error;
    }
}

}

export const cartManager = new CartManager("./src/data/cart.json")