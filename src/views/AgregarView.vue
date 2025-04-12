<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Agregar Producto</h1>

    <ProductForm @success="handleSuccess" @error="handleError" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import ProductForm from "../components/ProductForm.vue";

const router = useRouter();

const handleSuccess = () => {
  router.push("/productos");
};

const handleError = (error) => {
  alert(error);
};
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
