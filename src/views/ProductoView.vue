<template>
  <div class="container mx-auto p-4">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Agregar Producto</h1>
        <button class="btn btn-ghost" @click="$router.push('/')">
          <i class="fas fa-arrow-left"></i>
          Volver
        </button>
      </div>

      <div v-if="error" class="alert alert-error mb-4">
        {{ error }}
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <ProductForm :loading="loading" @submit="handleSubmit" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProductForm from "../components/ProductForm.vue";
import { productService } from "../services/productService";

const router = useRouter();
const error = ref("");
const loading = ref(false);

async function handleSubmit(data) {
  try {
    loading.value = true;
    error.value = "";

    // Validar datos requeridos
    if (
      !data.sku ||
      !data.nombre ||
      !data.precio_compra ||
      !data.precio_venta ||
      !data.stock
    ) {
      throw new Error("Por favor complete todos los campos requeridos");
    }

    // Convertir valores numéricos
    const productData = {
      ...data,
      precio_compra: Number(data.precio_compra),
      precio_venta: Number(data.precio_venta),
      stock: Number(data.stock),
    };

    await productService.createProduct(productData);
    router.push("/");
  } catch (err) {
    error.value = err.message || "Error al crear el producto";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded flex items-center gap-2 transition-colors duration-200;
}

.btn-ghost {
  @apply text-gray-600 hover:bg-gray-100;
}

.alert {
  @apply p-4 rounded;
}

.alert-error {
  @apply bg-red-100 text-red-700 border border-red-200;
}
</style>
