import fs from "fs";
import { validator } from "./validations/Validator.js"
import { productManager } from "../manager/ProductManager.js"

class CartManager {
    constructor(path) {
        this.path = path
    }

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(carts);
            }
        } catch (error) {
            throw error
        }
    }

    getCartById = async (id) => {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((c) => c.id === Number(id));

            if (!cart) throw new Error("Carrito no encontrado");
            return cart;

        } catch (error) {
            throw error;
        }
    }

    getProductsFromCart = async (id) => {
        try {
            const cart = await this.getCartById(id)
            return cart.products;
        } catch (error) {
            throw error;
        }
    }

    createCart = async () => {

        try {
            const carts = await this.getCarts();
            const id = validator.generateId(carts);

            const cart = {
                id: id,
                products: []
            }
            carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return {
                cart,
                status: "new" 
            }
        } catch (error) {
            throw error
        }
    }

addProductToCart = async (idCart, idProduct) => {
    try {
        const carts = await this.getCarts();
        await this.getCartById(idCart)
        await productManager.getProductById(idProduct);

        const cartIndex = carts.findIndex(c => c.id === Number(idCart));
        const cart = carts[cartIndex];
        const productInCart = cart.products.find(p => p.id === Number(idProduct));

        if (!productInCart) {
            cart.products.push({
                id: Number(idProduct),
                quantity: 1
            });
        } else {
            productInCart.quantity += 1;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

        return {
                cart,
                status: "added"
        };

    } catch (error) {
        throw error;
    }
}

}

export const cartManager = new CartManager("./src/data/cart.json")