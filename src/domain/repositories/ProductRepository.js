import { Product } from "../entities/Product";

export class ProductRepository {
  /**
   * @returns {Promise<Product[]>}
   */
  async findAll() {
    throw new Error("Method not implemented");
  }

  /**
   * @param {string} id
   * @returns {Promise<Product|null>}
   */
  async findById(id) {
    throw new Error("Method not implemented");
  }

  /**
   * @param {Product} product
   * @returns {Promise<Product>}
   */
  async create(product) {
    throw new Error("Method not implemented");
  }

  /**
   * @param {string} id
   * @param {Product} product
   * @returns {Promise<Product>}
   */
  async update(id, product) {
    throw new Error("Method not implemented");
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    throw new Error("Method not implemented");
  }
}
