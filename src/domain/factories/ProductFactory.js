import { ProductEntity } from "../entities/ProductEntity.js";

export class ProductFactory {
    static create(id, data) {
        return new ProductEntity(id, data);
    }
}
