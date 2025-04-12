import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { ApiClient } from "../api/ApiClient";

export class ProductRepositoryImpl extends ProductRepository {
  constructor() {
    super();
    this.apiClient = new ApiClient();
  }

  async findAll() {
    const response = await this.apiClient.get("/productos");
    return response.map((productData) => new Product(productData));
  }

  async findById(id) {
    const response = await this.apiClient.get(`/productos/${id}`);
    return new Product(response);
  }

  async create(product) {
    const response = await this.apiClient.post("/productos", product);
    return new Product(response);
  }

  async update(id, product) {
    const response = await this.apiClient.put(`/productos/${id}`, product);
    return new Product(response);
  }

  async delete(id) {
    await this.apiClient.delete(`/productos/${id}`);
  }
}
