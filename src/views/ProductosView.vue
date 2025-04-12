<template>
  <div class="productos-view">
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">
          Inventario de Productos
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          Gestiona todos tus productos desde un solo lugar
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <router-link to="/agregar" class="add-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Agregar Producto
        </router-link>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div
        class="valor-total bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-6"
      >
        <h3
          class="text-sm font-semibold text-blue-900 uppercase tracking-wider mb-2"
        >
          Valor Total de Compra
        </h3>
        <p class="text-3xl font-bold text-blue-900">
          {{ totalValue ? formatPrice(totalValue.totalCompra) : "..." }}
        </p>
        <p class="mt-1 text-sm text-blue-700">Inversión total en inventario</p>
      </div>
      <div
        class="valor-total bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6"
      >
        <h3
          class="text-sm font-semibold text-green-900 uppercase tracking-wider mb-2"
        >
          Valor Total de Venta
        </h3>
        <p class="text-3xl font-bold text-green-900">
          {{ totalValue ? formatPrice(totalValue.totalVenta) : "..." }}
        </p>
        <p class="mt-1 text-sm text-green-700">Valor potencial de venta</p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-4 sm:p-6 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="relative flex-1">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              v-model="searchTerm"
              placeholder="Buscar productos..."
              class="search-input pl-10"
              @input="handleSearch"
            />
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="mt-2 text-sm text-gray-500">Cargando productos...</p>
      </div>

      <div v-else-if="error" class="error-container">
        <svg
          class="h-6 w-6 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="mt-1 text-sm text-red-600">{{ error }}</p>
      </div>

      <div v-else-if="products.length === 0" class="empty-state">
        <svg
          class="h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
        <p class="mt-1 text-sm text-gray-500">
          Comienza agregando tu primer producto al inventario.
        </p>
        <div class="mt-6">
          <router-link to="/agregar" class="add-button-small">
            <svg
              class="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Agregar Producto
          </router-link>
        </div>
      </div>

      <ProductTable
        v-else
        :products="products"
        @delete="handleDelete"
        @update-prices="handleUpdatePrices"
        @update-product="handleUpdateProduct"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductTable from "../components/ProductTable.vue";
import { productService } from "../services/productService";

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const searchTerm = ref("");
const totalValue = ref(null);

const loadProducts = async (search = "") => {
  try {
    loading.value = true;
    error.value = null;
    const productList = await productService.getProducts(search);
    products.value = productList;

    // Calcular totales
    if (productList.length > 0) {
      totalValue.value = {
        totalCompra: productList.reduce((sum, p) => sum + p.precio_compra, 0),
        totalVenta: productList.reduce((sum, p) => sum + p.precio_venta, 0),
      };
    }
  } catch (err) {
    error.value = "Error al cargar los productos: " + err.message;
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  const debounceTimeout = setTimeout(() => {
    loadProducts(searchTerm.value);
  }, 300);
  return () => clearTimeout(debounceTimeout);
};

const handleDelete = async (id) => {
  try {
    loading.value = true;
    await productService.deleteProduct(id);
    await loadProducts(searchTerm.value);
  } catch (err) {
    error.value = "Error al eliminar el producto: " + err.message;
  } finally {
    loading.value = false;
  }
};

const handleUpdateProduct = async (data) => {
  try {
    loading.value = true;
    error.value = null;

    await productService.updateProduct(data.id, data.data);

    // Actualizar el producto en la lista local
    const index = products.value.findIndex((p) => p.id === data.id);
    if (index !== -1) {
      products.value[index] = {
        ...products.value[index],
        ...data.data,
      };
    }
  } catch (err) {
    error.value = "Error al actualizar el producto: " + err.message;
  } finally {
    loading.value = false;
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(price);
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.productos-view {
  @apply space-y-6;
}

.search-input {
  @apply block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.add-button {
  @apply inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200;
}

.add-button-small {
  @apply inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200;
}

.loading-container {
  @apply flex flex-col items-center justify-center py-12;
}

.loading-spinner {
  @apply h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600;
}

.error-container {
  @apply flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8;
}

.empty-state {
  @apply flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-center;
}
</style>
