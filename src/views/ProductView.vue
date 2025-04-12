<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Producto</h1>
    <ProductForm
      :initial-values="{}"
      submit-button-text="GUARDAR"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";

export default {
  name: "ProductView",
  components: {
    ProductForm,
  },
  methods: {
    handleSubmit(formData) {
      console.log("Datos del formulario:", formData);
      // Aquí manejas el envío del formulario
    },
  },
};
</script>
