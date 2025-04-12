<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Editar Producto</h1>
        <router-link
          to="/"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Volver
        </router-link>
      </div>

      <div
        v-if="error"
        class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ error }}
      </div>

      <div v-if="loading" class="text-center">
        <p>Cargando producto...</p>
      </div>

      <form
        v-else
        @submit.prevent="handleSubmit"
        class="bg-white shadow rounded-lg p-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Información Básica -->
          <div class="md:col-span-2">
            <h2 class="text-lg font-medium mb-4">Información Básica</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >SKU *</label
                >
                <input
                  v-model="product.sku"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Nombre *</label
                >
                <input
                  v-model="product.nombre"
                  type="text"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <!-- Descripción -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700"
              >Descripción</label
            >
            <textarea
              v-model="product.descripcion"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
          </div>

          <!-- Información Detallada -->
          <div class="md:col-span-2">
            <h2 class="text-lg font-medium mb-4">Información Detallada</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Modelo</label
                >
                <input
                  v-model="product.modelo"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Marca</label
                >
                <input
                  v-model="product.marca"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Referencia</label
                >
                <input
                  v-model="product.referencia"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <!-- Costos y Precios -->
          <div class="md:col-span-2">
            <h2 class="text-lg font-medium mb-4">Costos y Precios</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Costo Anterior</label
                >
                <input
                  v-model.number="product.costo_anterior"
                  type="number"
                  step="0.01"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Costo Actual</label
                >
                <input
                  v-model.number="product.costo_actual"
                  type="number"
                  step="0.01"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <!-- Precios de Venta -->
          <div class="md:col-span-2">
            <h2 class="text-lg font-medium mb-4">Precios de Venta</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Utilidad 1 (%)</label
                >
                <input
                  v-model.number="product.utilidad_1"
                  type="number"
                  step="0.01"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Precio 1</label
                >
                <input
                  v-model.number="product.precio_1"
                  type="number"
                  step="0.01"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Stock</label
                >
                <input
                  v-model.number="product.stock"
                  type="number"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { productService } from "../services/productService";

const router = useRouter();
const route = useRoute();
const error = ref("");
const loading = ref(true);

const product = ref({
  sku: "",
  nombre: "",
  descripcion: "",
  descripcion_detallada: "",
  modelo: "",
  marca: "",
  referencia: "",
  costo_anterior: 0,
  costo_actual: 0,
  utilidad_1: 0,
  precio_1: 0,
  utilidad_2: 0,
  precio_2: 0,
  utilidad_3: 0,
  precio_3: 0,
  stock: 0,
});

const loadProduct = async () => {
  try {
    loading.value = true;
    error.value = "";
    const productId = route.params.id;
    const response = await productService.getProductById(productId);
    product.value = response;
  } catch (err) {
    error.value = "Error al cargar el producto";
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = "";

    // Validar campos requeridos
    if (!product.value.sku || !product.value.nombre) {
      throw new Error(
        "Por favor complete los campos requeridos (SKU y Nombre)"
      );
    }

    await productService.updateProduct(route.params.id, product.value);
    router.push("/");
  } catch (err) {
    error.value = err.message || "Error al actualizar el producto";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadProduct();
});
</script>

<style scoped>
.editar-producto {
  @apply max-w-4xl mx-auto;
}

.back-button {
  @apply inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200;
}

.loading-container {
  @apply flex flex-col items-center justify-center py-12;
}

.loading-spinner {
  @apply h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600;
}
</style>
