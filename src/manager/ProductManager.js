import { validator } from "../domain/shared/Validator.js"
import { workWithfile } from "../infraestructure/repositories/WorkWithFiles.js"
import { Factory } from "../domain/factories/Factory.js"

class ProductManager {
    constructor(path) {
        this.path = path
    }

    getProducts = async () => {
            const products = await workWithfile.readFile(this.path)
            if (products.length === 0) throw new Error("No existen productos")
            return products
    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts()
            const product = products.find((p) => p.id === Number(id))

            if (!product) throw new Error("Producto no encontrado")

            return product

        } catch (error) {
            throw error
        }
    }

    addProduct = async (object) => {
        try {
            validator.isEmpty(object)
            const products = await this.getProducts()
            const id = validator.generateId(products)
            const productValidate = Factory.create("product", id, object, "add")
            const newProduct = { ...productValidate }
            products.push(newProduct)
            await workWithfile.writeFile(this.path, JSON.stringify(products, null, 2))

            return {
                product: newProduct,
                status: "new"
            }

        } catch (error) {
            throw error
        }
    }


    updateProduct = async (id, object) => {
        try {

            validator.isEmpty(object)
            if ('id' in object) throw new Error("No se puede modificar el campo 'id'")

            const products = await this.getProducts()
            await this.getProductById(id)

            const i = products.findIndex(p => p.id === Number(id))
            const product = { ...products[i], ...object }

            Factory.create("product", id, product, "update")
            products[i] = product
            
            await workWithfile.writeFile(this.path, JSON.stringify(products, null, 2))

            return {
                product,
                status: "updated"
            }

        } catch (error) {
            throw error
        }
    }

    deleteProduct = async (id) => {
        try {
            const products = await this.getProducts()
            await this.getProductById(id)
            const newArray = products.filter((u) => u.id !== Number(id))
            await workWithfile.writeFile(this.path, JSON.stringify(newArray))
            return {
                id: id,
                status: "deleted"
            }
        } catch (error) {
            throw error
        }
    }

}

export const productManager = new ProductManager('./src/infraestructure/data/products.json')
