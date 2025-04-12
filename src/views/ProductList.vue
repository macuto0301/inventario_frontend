<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Productos</h1>
      <router-link
        to="/productos/nuevo"
        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Nuevo Producto
      </router-link>
    </div>

    <div class="mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar productos..."
        class="w-full px-4 py-2 border rounded-md"
        @input="handleSearch"
      />
    </div>

    <div v-if="loading" class="text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    >
      {{ error }}
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th
              class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              SKU
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Stock
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Precio
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 border-b border-gray-200">
              {{ product.sku }}
            </td>
            <td class="px-6 py-4 border-b border-gray-200">
              {{ product.nombre }}
            </td>
            <td class="px-6 py-4 border-b border-gray-200">
              {{ product.stock }}
            </td>
            <td class="px-6 py-4 border-b border-gray-200">
              {{ product.precio_1 }}
            </td>
            <td class="px-6 py-4 border-b border-gray-200">
              <div class="flex space-x-2">
                <router-link
                  :to="`/productos/${product.id}/editar`"
                  class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Editar
                </router-link>
                <button
                  @click="deleteProduct(product.id)"
                  class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
