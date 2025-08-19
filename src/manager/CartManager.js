import { validator } from "../domain/shared/Validator.js"
import { productManager } from "../manager/ProductManager.js"
import { workWithfile } from "../infraestructure/repositories/WorkWithFiles.js"

class CartManager {
    constructor(path) {
        this.path = path
    }

    getCarts = async () => {
        const carts = workWithfile.readFile(this.path)
        if (carts.length === 0) throw new Error("No existen carritos")
        return carts
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
            return {
                products: cart.products,
            };
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
            await workWithfile.writeFile(this.path, JSON.stringify(carts, null, 2))
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
            const product = await productManager.getProductById(idProduct);
            const cartIndex = carts.findIndex(c => c.id === Number(idCart));
            const cart = carts[cartIndex];
            const productInCart = cart.products.find(p => p.id === Number(idProduct));


            if (!productInCart) {
                cart.products.push({
                    id: Number(idProduct),
                    quantity: 1
                });
            }
            else {
                if (productInCart.quantity === product.stock) throw new Error("No hay más stock del producto")
                productInCart.quantity += 1
            }

            await workWithfile.writeFile(this.path, JSON.stringify(carts, null, 2));

            return {
                cart,
                status: "added"
            };

        } catch (error) {
            throw error;
        }
    }

}

export const cartManager = new CartManager('./src/infraestructure/data/cart.json')