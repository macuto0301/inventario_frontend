const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/productos";

export const productService = {
  // Get all products with optional search term
  async getProducts(searchTerm = "") {
    try {
      const url = searchTerm
        ? `${API_URL}?termino=${encodeURIComponent(searchTerm)}`
        : API_URL;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Get a product by ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new product
  async createProduct(product) {
    try {
      // Validar solo campos requeridos
      if (!product.sku || !product.nombre) {
        throw new Error("Faltan campos requeridos");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku: product.sku,
          nombre: product.nombre,
          descripcion: product.descripcion || "",
          descripcion_detallada: product.descripcionDetallada || "",
          modelo: product.modelo || "",
          marca: product.marca || "",
          referencia: product.referencia || "",
          costo_anterior: Number(product.costoAnterior) || 0,
          costo_actual: Number(product.costoActual) || 0,
          utilidad_1: Number(product.utilidad1) || 0,
          precio_1: Number(product.precio1) || 0,
          utilidad_2: Number(product.utilidad2) || 0,
          precio_2: Number(product.precio2) || 0,
          utilidad_3: Number(product.utilidad3) || 0,
          precio_3: Number(product.precio3) || 0,
          stock: Number(product.stock) || 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  // Update an existing product
  async updateProduct(id, product) {
    try {
      // Validar campos requeridos
      if (!product.sku || !product.nombre) {
        throw new Error("Faltan campos requeridos");
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku: product.sku,
          nombre: product.nombre,
          descripcion: product.descripcion || "",
          descripcion_detallada: product.descripcion_detallada || "",
          modelo: product.modelo || "",
          marca: product.marca || "",
          referencia: product.referencia || "",
          costo_anterior: Number(product.costo_anterior) || 0,
          costo_actual: Number(product.costo_actual) || 0,
          utilidad_1: Number(product.utilidad_1) || 0,
          precio_1: Number(product.precio_1) || 0,
          utilidad_2: Number(product.utilidad_2) || 0,
          precio_2: Number(product.precio_2) || 0,
          utilidad_3: Number(product.utilidad_3) || 0,
          precio_3: Number(product.precio_3) || 0,
          stock: Number(product.stock) || 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a product
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  },

  // Update product stock
  async updateProductStock(id, stock) {
    try {
      const response = await fetch(`${API_URL}/${id}/stock`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating stock for product with ID ${id}:`, error);
      throw error;
    }
  },

  // Get total inventory value
  async getTotalValue() {
    try {
      const response = await fetch(`${API_URL}/reporte-valor`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching total value:", error);
      throw error;
    }
  },
};
