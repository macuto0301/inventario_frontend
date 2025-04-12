import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class ProductService {
  /**
   * @param {ProductRepository} productRepository
   */
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * @returns {Promise<Product[]>}
   */
  async getAllProducts() {
    return this.productRepository.findAll();
  }

  /**
   * @param {string} id
   * @returns {Promise<Product|null>}
   */
  async getProductById(id) {
    return this.productRepository.findById(id);
  }

  /**
   * @param {Object} productData
   * @returns {Promise<Product>}
   */
  async createProduct(productData) {
    const product = new Product(productData);
    product.validar();
    return this.productRepository.create(product);
  }

  /**
   * @param {string} id
   * @param {Object} productData
   * @returns {Promise<Product>}
   */
  async updateProduct(id, productData) {
    const product = new Product(productData);
    product.validar();
    return this.productRepository.update(id, product);
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteProduct(id) {
    return this.productRepository.delete(id);
  }

  /**
   * @param {string} id
   * @param {number} cantidad
   * @returns {Promise<Product>}
   */
  async updateStock(id, cantidad) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    product.actualizarStock(cantidad);
    return this.productRepository.update(id, product);
  }
}
