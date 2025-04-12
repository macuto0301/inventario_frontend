<template>
  <div class="product-table">
    <div class="w-full overflow-x-auto">
      <table class="w-full divide-y divide-gray-200 shadow-sm rounded-lg">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              SKU
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Nombre
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Descripción
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Marca
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Referencia
            </th>
            <th
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Stock
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Precio
            </th>
            <th
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="product in props.products"
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
                >{{ product.stock }}</span
              >
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-blue-600 text-right"
            >
              {{ formatPrice(product.precio_1) }}
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
                <div class="relative inline-block">
                  <button
                    @click="verPrecios(product, $event)"
                    class="view-prices-btn"
                  >
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
                        d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span class="btn-text">Ver Precios</span>
                  </button>
                  <div
                    v-if="activePopover === product.id"
                    class="prices-popover"
                    :style="{
                      position: 'fixed',
                      top: popoverPosition.top + 'px',
                      left: popoverPosition.left + 'px',
                      transform: 'translateY(-100%)',
                    }"
                    @mouseleave="activePopover = null"
                  >
                    <div class="prices-content">
                      <div class="price-row">
                        <span class="price-label">Costo:</span>
                        <span class="price-value">{{
                          formatPrice(product.costo_actual)
                        }}</span>
                      </div>
                      <div class="price-row">
                        <span class="price-label">Precio 1:</span>
                        <div class="price-input-container">
                          <input
                            type="number"
                            v-model="editingPrices.precio_1"
                            class="price-input"
                          />
                        </div>
                      </div>
                      <div class="price-row">
                        <span class="price-label">Precio 2:</span>
                        <div class="price-input-container">
                          <input
                            type="number"
                            v-model="editingPrices.precio_2"
                            class="price-input"
                          />
                        </div>
                      </div>
                      <div class="price-row">
                        <span class="price-label">Precio 3:</span>
                        <div class="price-input-container">
                          <input
                            type="number"
                            v-model="editingPrices.precio_3"
                            class="price-input"
                          />
                        </div>
                      </div>
                      <div class="actions-row">
                        <button
                          @click="guardarPrecios(product)"
                          class="save-btn"
                        >
                          Guardar
                        </button>
                        <button
                          @click="activePopover = null"
                          class="cancel-btn"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
    </div>

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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["delete", "update-prices"]);
const router = useRouter();
const activePopover = ref(null);
const popoverPosition = ref({ top: 0, left: 0 });
const editingPrices = ref({
  precio_1: 0,
  precio_2: 0,
  precio_3: 0,
});

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

.prices-popover {
  @apply z-[9999] bg-white rounded-lg shadow-lg border border-gray-200;
  width: 250px;
}

.relative.inline-block {
  position: relative;
  display: inline-block;
}

.prices-content {
  @apply p-3;
}

.price-row {
  @apply flex justify-between items-center py-1;
}

.price-row:not(:last-child) {
  @apply border-b border-gray-100;
}

.price-label {
  @apply text-sm text-gray-600 font-medium;
}

.price-value {
  @apply text-sm text-gray-900 font-mono font-bold;
}

.price-input-container {
  @apply flex items-center;
}

.price-input {
  @apply w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.actions-row {
  @apply flex justify-end space-x-2 mt-3 pt-2 border-t border-gray-100;
}

.save-btn {
  @apply px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

.cancel-btn {
  @apply px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2;
}
</style>
