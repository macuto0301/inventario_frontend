const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/productos";

class Product {
  constructor(id, nombre, descripcion, sku, precioCompra, precioVenta, stock) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.sku = sku;
    this.precioCompra = precioCompra;
    this.precioVenta = precioVenta;
    this.stock = stock;
  }

  static fromDatabase(dbProduct) {
    return new Product(
      dbProduct.id,
      dbProduct.nombre,
      dbProduct.descripcion,
      dbProduct.sku,
      Number.parseFloat(dbProduct.precio_compra),
      Number.parseFloat(dbProduct.precio_venta),
      dbProduct.stock
    );
  }

  toDatabase() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      sku: this.sku,
      precio_compra: this.precioCompra,
      precio_venta: this.precioVenta,
      stock: this.stock,
    };
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || `Error: ${response.status}`);
  }
  return response.json();
}

export async function createProduct(productData) {
  try {
    const product = new Product(
      null,
      productData.nombre,
      productData.descripcion,
      productData.sku,
      productData.precio_compra,
      productData.precio_venta,
      productData.stock
    );

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product.toDatabase()),
    });

    const data = await handleResponse(response);
    return Product.fromDatabase(data);
  } catch (error) {
    throw new Error(error.message || "Error al crear el producto");
  }
}

export async function getProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await handleResponse(response);
    return data.map((product) => Product.fromDatabase(product));
  } catch (error) {
    throw new Error(error.message || "Error al obtener los productos");
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await handleResponse(response);
    return Product.fromDatabase(data);
  } catch (error) {
    throw new Error(error.message || "Error al obtener el producto");
  }
}

export async function updateProduct(id, productData) {
  try {
    const product = new Product(
      id,
      productData.nombre,
      productData.descripcion,
      productData.sku,
      productData.precio_compra,
      productData.precio_venta,
      productData.stock
    );

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product.toDatabase()),
    });

    const data = await handleResponse(response);
    return Product.fromDatabase(data);
  } catch (error) {
    throw new Error(error.message || "Error al actualizar el producto");
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message || "Error al eliminar el producto");
  }
}
