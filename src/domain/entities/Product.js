export class Product {
  constructor({
    sku,
    nombre,
    descripcion,
    marca,
    referencia,
    stock,
    costoActual,
    precio1,
    precio2,
    precio3,
  }) {
    this.sku = sku;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.marca = marca;
    this.referencia = referencia;
    this.stock = stock;
    this.costoActual = costoActual;
    this.precio1 = precio1;
    this.precio2 = precio2;
    this.precio3 = precio3;
  }

  calcularPrecio(utilidad) {
    if (!this.costoActual || this.costoActual <= 0) return 0;
    const precio = this.costoActual * (1 + utilidad / 100);
    return Number(precio.toFixed(2));
  }

  calcularUtilidad(precio) {
    if (!this.costoActual || this.costoActual <= 0 || !precio || precio <= 0)
      return 0;
    const utilidad = (precio / this.costoActual - 1) * 100;
    return Number(utilidad.toFixed(2));
  }

  actualizarStock(cantidad) {
    if (this.stock + cantidad < 0) {
      throw new Error("No hay suficiente stock disponible");
    }
    this.stock += cantidad;
  }

  validar() {
    if (!this.sku) throw new Error("El SKU es requerido");
    if (!this.nombre) throw new Error("El nombre es requerido");
    if (this.stock < 0) throw new Error("El stock no puede ser negativo");
    if (this.costoActual < 0)
      throw new Error("El costo actual no puede ser negativo");
    return true;
  }
}
