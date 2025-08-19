import { ProductEntity } from "../entities/ProductEntity.js";

export class Factory {
    static create(type, id, data, method) {
        switch (type) {
            case "product":
                return new ProductEntity(id, data, method)
            default:
                throw new Error(`Tipo no soportado: ${type}`);
        }
    }
}
