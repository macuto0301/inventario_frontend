<template>
  <div class="product-table">
    <div class="flex justify-between items-center mb-4">
      <div class="relative flex-1 mr-4">
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
          placeholder="Buscar por SKU, nombre o descripción..."
          class="search-input pl-10"
          @input="handleSearch"
        />
      </div>
      <button
        @click="showDollarPrices"
        class="dollar-btn"
        :class="{ 'bg-green-600': showDollarInfo }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
          />
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="btn-text">Ver Precios Dólar</span>
      </button>
    </div>

    <div v-if="showDollarInfo" class="dollar-info mb-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="dollar-card bg-blue-50">
          <div class="flex items-center justify-between mb-2">
            <h3 class="dollar-title">Dólar Oficial</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p class="dollar-price">
            {{ formatPrice(dollarPrices.oficial.precio) }}
          </p>
          <p class="dollar-date">
            Actualizado:
            {{ formatDate(dollarPrices.oficial.fechaActualizacion) }}
          </p>
        </div>
        <div class="dollar-card bg-green-50">
          <div class="flex items-center justify-between mb-2">
            <h3 class="dollar-title">Dólar Paralelo</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p class="dollar-price">
            {{ formatPrice(dollarPrices.paralelo.precio) }}
          </p>
          <p class="dollar-date">
            Actualizado:
            {{ formatDate(dollarPrices.paralelo.fechaActualizacion) }}
          </p>
        </div>
      </div>
    </div>

    <table
      class="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden"
    >
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            SKU
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Nombre
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Descripción
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Marca
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Referencia
          </th>
          <th
            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Stock
          </th>
          <th
            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Costo Actual
          </th>
          <th
            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Precio 1
          </th>
          <th
            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Precio 2
          </th>
          <th
            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Precio 3
          </th>
          <th
            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="product in filteredProducts"
          :key="product.id"
          class="hover:bg-gray-50 transition-colors duration-150"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900"
          >
            {{ product.sku }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            {{ product.nombre }}
          </td>
          <td
            class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate"
            :title="product.descripcion"
          >
            {{ product.descripcion }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ product.marca }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ product.referencia }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
            <span
              :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                stockStatusClass(product.stock) === 'stock-out'
                  ? 'bg-red-100 text-red-800'
                  : stockStatusClass(product.stock) === 'stock-low'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800',
              ]"
            >
              {{ product.stock }}
            </span>
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 text-right"
          >
            {{ formatPrice(product.costo_actual) }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-blue-600 text-right"
          >
            {{ formatPrice(product.precio_1) }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 text-right"
          >
            {{ formatPrice(product.precio_2) }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 text-right"
          >
            {{ formatPrice(product.precio_3) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
            <div class="flex justify-center space-x-2">
              <button @click="editProduct(product.id)" class="edit-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span class="btn-text">Editar</span>
              </button>
              <button @click="confirmDelete(product.id)" class="delete-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span class="btn-text">Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="props.products.length === 0" class="empty-state">
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
      <h3 class="mt-2 text-sm font-medium text-gray-900">
        No se encontraron productos
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Intenta con otros términos de búsqueda.
      </p>
    </div>

    <!-- Modal de Edición -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          @click="closeEditModal"
          class="absolute top-4 right-4 p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 transition-colors duration-200 flex items-center justify-center shadow-sm"
          title="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Editar Producto
          </h3>
          <ProductForm
            :initial-values="{
              sku: selectedProduct.sku,
              nombre: selectedProduct.nombre,
              descripcion: selectedProduct.descripcion,
              marca: selectedProduct.marca,
              referencia: selectedProduct.referencia,
              stock: selectedProduct.stock,
              costo_actual: selectedProduct.costo_actual,
              precio_1: selectedProduct.precio_1,
              precio_2: selectedProduct.precio_2,
              precio_3: selectedProduct.precio_3,
              utilidad1: selectedProduct.utilidad1,
              utilidad2: selectedProduct.utilidad2,
              utilidad3: selectedProduct.utilidad3,
              redondeo: selectedProduct.redondeo,
            }"
            @submit="handleEditSubmit"
            @cancel="closeEditModal"
          />
        </div>
      </div>
    </div>

    <!-- Modal de Agregar Producto -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          @click="showAddModal = false"
          class="absolute top-4 right-4 p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 transition-colors duration-200 flex items-center justify-center shadow-sm"
          title="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Agregar Producto
          </h3>
          <ProductForm
            :initial-values="{
              sku: '',
              nombre: '',
              descripcion: '',
              marca: '',
              referencia: '',
              stock: 0,
              costo_actual: 0,
              precio_1: 0,
              precio_2: 0,
              precio_3: 0,
              utilidad1: 30,
              utilidad2: 25,
              utilidad3: 20,
              redondeo: 'normal',
            }"
            @submit="handleAddSubmit"
            @cancel="showAddModal = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProductForm from "./ProductForm.vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["delete", "update-prices", "update-product"]);
const router = useRouter();
const activePopover = ref(null);
const activeEditPopover = ref(null);
const popoverPosition = ref({ top: 0, left: 0 });
const editingPrices = ref({
  precio_1: 0,
  precio_2: 0,
  precio_3: 0,
});
const editingProduct = ref({
  sku: "",
  nombre: "",
  descripcion: "",
  marca: "",
  referencia: "",
  stock: 0,
  costo_actual: 0,
  precio_1: 0,
  precio_2: 0,
  precio_3: 0,
});

const showEditModal = ref(false);
const selectedProduct = ref(null);
const showAddModal = ref(false);

const editProduct = (product, event) => {
  if (activeEditPopover.value === product.id) {
    activeEditPopover.value = null;
    return;
  }

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const popoverWidth = 350;
  const popoverHeight = 600;

  popoverPosition.value = {
    top: (windowHeight - popoverHeight) / 2,
    left: (windowWidth - popoverWidth) / 2,
  };

  editingProduct.value = { ...product };
  activeEditPopover.value = product.id;
};

const handleSearch = () => {
  // La búsqueda se maneja automáticamente a través del computed filteredProducts
};

const editProduct = (id) => {
  router.push(`/editar/${id}`);
};

const confirmDelete = async (id) => {
  if (confirm("¿Está seguro de que desea eliminar este producto?")) {
    emit("delete", id);
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(price);
};

const stockStatusClass = (stock) => {
  if (stock <= 0) return "stock-out";
  if (stock <= 10) return "stock-low";
  return "stock-ok";
};

const verPrecios = (product, event) => {
  if (activePopover.value === product.id) {
    activePopover.value = null;
    return;
  }

  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  popoverPosition.value = {
    top: rect.top - 10,
    left: rect.left,
  };

  editingPrices.value = {
    precio_1: product.precio_1,
    precio_2: product.precio_2,
    precio_3: product.precio_3,
  };

  activePopover.value = product.id;
};

const guardarPrecios = (product) => {
  const precios = {
    precio_1: Number(editingPrices.value.precio_1),
    precio_2: Number(editingPrices.value.precio_2),
    precio_3: Number(editingPrices.value.precio_3),
  };

  emit("update-prices", {
    id: product.id,
    precios,
  });
  activePopover.value = null;
};

const handleEditSubmit = async (formData) => {
  try {
    const response = await fetch(
      `http://localhost:3001/productos/${selectedProduct.value.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: selectedProduct.value.id,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }

    // Actualizar la lista de productos
    const updatedProduct = await response.json();
    const index = props.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      props.products[index] = updatedProduct;
    }

    closeEditModal();
  } catch (error) {
    console.error("Error:", error);
    alert("Error al actualizar el producto. Por favor, intente nuevamente.");
  }
};

const handleAddSubmit = async (formData) => {
  try {
    const response = await fetch("http://localhost:3001/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error al crear el producto");
    }

    const newProduct = await response.json();
    props.products.push(newProduct);
    showAddModal.value = false;
  } catch (error) {
    console.error("Error:", error);
    alert("Error al crear el producto. Por favor, intente nuevamente.");
  }
};
</script>

<style scoped>
.product-table {
  @apply overflow-x-auto rounded-lg;
}

.search-input {
  @apply block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

table {
  @apply min-w-full divide-y divide-gray-200;
}

th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50;
}

td {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
}

tr {
  @apply hover:bg-gray-50 transition-colors duration-150;
}

.actions {
  @apply flex justify-center space-x-2;
}

.edit-btn,
.delete-btn,
.view-prices-btn {
  @apply inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200;
}

.edit-btn {
  @apply bg-blue-600 hover:bg-blue-700 focus:ring-blue-500;
}

.view-prices-btn {
  @apply bg-green-600 hover:bg-green-700 focus:ring-green-500;
}

.delete-btn {
  @apply bg-red-600 hover:bg-red-700 focus:ring-red-500;
}

.btn-text {
  @apply ml-1;
}

.stock-out {
  @apply bg-red-100 text-red-800;
}

.stock-low {
  @apply bg-yellow-100 text-yellow-800;
}

.stock-ok {
  @apply bg-green-100 text-green-800;
}

.empty-state {
  @apply flex flex-col items-center justify-center py-12;
}

.dollar-btn {
  @apply px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center;
}

.dollar-info {
  @apply bg-white rounded-lg border border-gray-200 p-4 shadow-sm;
}

.dollar-card {
  @apply rounded-lg p-4 border border-gray-200;
}

.dollar-title {
  @apply text-sm font-medium text-gray-700;
}

.dollar-price {
  @apply text-2xl font-bold text-gray-900;
}

.dollar-date {
  @apply text-xs text-gray-500 mt-2;
}
</style>
