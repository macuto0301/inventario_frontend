<template>
  <form @submit.prevent="handleSubmit" class="max-w-6xl mx-auto p-6">
    <div
      v-if="error"
      class="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800">
          Información del Producto
        </h2>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-2 gap-x-12 gap-y-8">
          <!-- Columna izquierda -->
          <div class="space-y-6">
            <div class="form-group">
              <label class="label-required">Código</label>
              <input
                v-model="form.sku"
                type="text"
                required
                class="form-input"
                placeholder="Ingrese el código"
              />
            </div>

            <div class="form-group">
              <label class="label-required">Descripción</label>
              <input
                v-model="form.nombre"
                type="text"
                required
                class="form-input"
                placeholder="Ingrese la descripción"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Descripción Detallada</label>
              <textarea
                v-model="form.descripcion"
                rows="4"
                class="form-input"
                placeholder="Ingrese una descripción detallada"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">Modelo</label>
                <input
                  v-model="form.modelo"
                  type="text"
                  class="form-input"
                  placeholder="Modelo"
                />
              </div>

              <div class="form-group">
                <label class="form-label">Marca</label>
                <input
                  v-model="form.marca"
                  type="text"
                  class="form-input"
                  placeholder="Marca"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Referencia</label>
              <input
                v-model="form.referencia"
                type="text"
                class="form-input"
                placeholder="Referencia"
              />
            </div>
          </div>

          <!-- Columna derecha -->
          <div class="space-y-6">
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 class="text-lg font-medium text-blue-900 mb-4">
                Costos y Precios
              </h3>

              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="form-group">
                    <label class="form-label">Costo Anterior</label>
                    <div class="relative">
                      <span
                        class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"
                        >$</span
                      >
                      <input
                        v-model.number="form.costoAnterior"
                        type="number"
                        step="0.01"
                        min="0"
                        class="form-input pl-7"
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Costo Actual</label>
                    <div class="relative">
                      <span
                        class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"
                        >$</span
                      >
                      <input
                        v-model.number="form.costoActual"
                        type="number"
                        step="0.01"
                        min="0"
                        @input="recalcularPrecios"
                        class="form-input pl-7"
                      />
                    </div>
                  </div>
                </div>

                <div class="border-t border-blue-100 pt-4">
                  <div class="flex space-x-2 mb-4">
                    <button
                      v-for="n in 3"
                      :key="n"
                      type="button"
                      class="px-4 py-1.5 text-sm font-medium rounded-md"
                      :class="[
                        activePriceTab === n
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-blue-600 hover:bg-blue-50',
                      ]"
                      @click="activePriceTab = n"
                    >
                      Precio {{ n }}
                    </button>
                  </div>

                  <div v-show="activePriceTab === 1" class="space-y-4">
                    <div class="form-group">
                      <label class="form-label">Utilidad 1</label>
                      <div class="relative">
                        <input
                          v-model.number="form.utilidad1"
                          type="number"
                          step="0.01"
                          min="0"
                          @input="calcularPrecio1"
                          class="form-input pr-8"
                        />
                        <span
                          class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                          >%</span
                        >
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Precio 1</label>
                      <div class="relative">
                        <span
                          class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"
                          >$</span
                        >
                        <input
                          v-model.number="form.precio1"
                          type="number"
                          step="0.01"
                          min="0"
                          @input="calcularUtilidad1"
                          class="form-input pl-7"
                        />
                      </div>
                    </div>
                  </div>

                  <div v-show="activePriceTab === 2" class="space-y-4">
                    <div class="form-group">
                      <label class="form-label">Utilidad 2</label>
                      <div class="relative">
                        <input
                          v-model.number="form.utilidad2"
                          type="number"
                          step="0.01"
                          min="0"
                          @input="calcularPrecio2"
                          class="form-input pr-8"
                        />
                        <span
                          class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                          >%</span
                        >
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Precio 2</label>
                      <div class="relative">
                        <span
                          class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"
                          >$</span
                        >
                        <input
                          v-model.number="form.precio2"
                          type="number"
                          step="0.01"
                          min="0"
                          @input="calcularUtilidad2"
                          class="form-input pl-7"
                        />
                      </div>
                    </div>
                  </div>

                  <div v-show="activePriceTab === 3" class="space-y-4">
                    <div class="form-group">
                      <label class="form-label">Utilidad 3</label>
                      <div class="relative">
                        <input
                          v-model.number="form.utilidad3"
                          type="number"
                          step="0.01"
                          min="0"
                          @input="calcularPrecio3"
                          class="form-input pr-8"
                        />
                        <span
                          class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                          >%</span
                        >
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Precio 3</label>
                      <div class="relative">
                        <span
                          class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"
                          >$</span
                        >
                        <input
                          v-model.number="form.precio3"
                          type="number"
                          step="0.01"
                          min="0"
                          @input="calcularUtilidad3"
                          class="form-input pl-7"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-8 pt-6 border-t">
          <button type="button" @click="resetForm" class="btn btn-ghost">
            Limpiar
          </button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>

    <!-- Popover de confirmación -->
    <div v-if="showConfirmation" class="confirmation-overlay">
      <div class="confirmation-popover">
        <h3 class="confirmation-title">Confirmar Producto</h3>
        <div class="confirmation-content">
          <div class="confirmation-row">
            <span class="confirmation-label">SKU:</span>
            <span class="confirmation-value">{{ form.sku }}</span>
          </div>
          <div class="confirmation-row">
            <span class="confirmation-label">Nombre:</span>
            <span class="confirmation-value">{{ form.nombre }}</span>
          </div>
          <div class="confirmation-row">
            <span class="confirmation-label">Descripción:</span>
            <span class="confirmation-value">{{ form.descripcion }}</span>
          </div>
          <div class="confirmation-row">
            <span class="confirmation-label">Marca:</span>
            <span class="confirmation-value">{{ form.marca }}</span>
          </div>
          <div class="confirmation-row">
            <span class="confirmation-label">Referencia:</span>
            <span class="confirmation-value">{{ form.referencia }}</span>
          </div>
          <div class="confirmation-row">
            <span class="confirmation-label">Stock:</span>
            <span class="confirmation-value">{{ form.stock }}</span>
          </div>
          <div class="confirmation-row">
            <span class="confirmation-label">Costo:</span>
            <span class="confirmation-value">{{
              formatPrice(form.costoActual)
            }}</span>
          </div>
          <div class="confirmation-row">
            <span class="confirmation-label">Precio 1:</span>
            <span class="confirmation-value">{{
              formatPrice(form.precio1)
            }}</span>
          </div>
          <div class="confirmation-row">
            <span class="confirmation-label">Precio 2:</span>
            <span class="confirmation-value">{{
              formatPrice(form.precio2)
            }}</span>
          </div>
          <div class="confirmation-row">
            <span class="confirmation-label">Precio 3:</span>
            <span class="confirmation-value">{{
              formatPrice(form.precio3)
            }}</span>
          </div>
        </div>
        <div class="confirmation-actions">
          <button @click="confirmSubmit" class="confirm-button">
            Confirmar
          </button>
          <button @click="cancelSubmit" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { productService } from "../services/productService";

const router = useRouter();
const emit = defineEmits(["success", "error"]);
const error = ref("");
const activePriceTab = ref(1);
const showConfirmation = ref(false);

const form = reactive({
  sku: "",
  nombre: "",
  descripcion: "",
  modelo: "",
  marca: "",
  referencia: "",
  costoAnterior: 0,
  costoActual: 0,
  utilidad1: 30,
  precio1: 0,
  utilidad2: 25,
  precio2: 0,
  utilidad3: 20,
  precio3: 0,
  stock: 0,
});

const redondear = (valor, tipo) => {
  switch (tipo) {
    case "superior":
      return Math.ceil(valor * 100) / 100;
    case "inferior":
      return Math.floor(valor * 100) / 100;
    default:
      return Math.round(valor * 100) / 100;
  }
};

const calcularPrecio = (costo, utilidad) => {
  if (!costo || costo <= 0) return 0;
  const precio = costo * (1 + utilidad / 100);
  return Number(precio.toFixed(2));
};

const calcularUtilidad = (costo, precio) => {
  if (!costo || costo <= 0 || !precio || precio <= 0) return 0;
  const utilidad = (precio / costo - 1) * 100;
  return Number(utilidad.toFixed(2));
};

const recalcularPrecios = () => {
  if (!form.costoActual || form.costoActual <= 0) {
    form.precio1 = 0;
    form.precio2 = 0;
    form.precio3 = 0;
    form.costoAnterior = 0;
    return;
  }

  form.precio1 = calcularPrecio(form.costoActual, form.utilidad1);
  form.precio2 = calcularPrecio(form.costoActual, form.utilidad2);
  form.precio3 = calcularPrecio(form.costoActual, form.utilidad3);
  form.costoAnterior = form.costoActual;
};

const calcularPrecio1 = () => {
  form.precio1 = calcularPrecio(form.costoActual, form.utilidad1);
};

const calcularPrecio2 = () => {
  form.precio2 = calcularPrecio(form.costoActual, form.utilidad2);
};

const calcularPrecio3 = () => {
  form.precio3 = calcularPrecio(form.costoActual, form.utilidad3);
};

const calcularUtilidad1 = () => {
  form.utilidad1 = calcularUtilidad(form.costoActual, form.precio1);
};

const calcularUtilidad2 = () => {
  form.utilidad2 = calcularUtilidad(form.costoActual, form.precio2);
};

const calcularUtilidad3 = () => {
  form.utilidad3 = calcularUtilidad(form.costoActual, form.precio3);
};

const validarForm = () => {
  error.value = "";
  const errores = [];

  // Solo validar los campos marcados como requeridos (con asterisco rojo)
  if (!form.sku || form.sku.trim() === "") {
    errores.push("El código es requerido");
  }
  if (!form.nombre || form.nombre.trim() === "") {
    errores.push("La descripción es requerida");
  }

  if (errores.length > 0) {
    error.value = "Faltan campos requeridos:\n" + errores.join("\n");
    return false;
  }

  // Convertir campos numéricos vacíos a 0
  form.costoAnterior = form.costoAnterior || 0;
  form.costoActual = form.costoActual || 0;
  form.utilidad1 = form.utilidad1 || 0;
  form.precio1 = form.precio1 || 0;
  form.utilidad2 = form.utilidad2 || 0;
  form.precio2 = form.precio2 || 0;
  form.utilidad3 = form.utilidad3 || 0;
  form.precio3 = form.precio3 || 0;

  return true;
};

const handleSubmit = async () => {
  showConfirmation.value = true;
};

const confirmSubmit = async () => {
  try {
    if (!validarForm()) return;

    const product = {
      sku: form.sku,
      nombre: form.nombre,
      descripcion: form.descripcion,
      marca: form.marca,
      referencia: form.referencia,
      stock: form.stock,
      costo_actual: form.costoActual,
      precio_1: form.precio1,
      precio_2: form.precio2,
      precio_3: form.precio3,
    };

    await productService.createProduct(product);
    showConfirmation.value = false;
    resetForm();
    emit("success", "Producto agregado exitosamente");
  } catch (error) {
    console.error("Error al crear el producto:", error);
    emit("error", error.message || "Error al crear el producto");
  }
};

const cancelSubmit = () => {
  showConfirmation.value = false;
};

const resetForm = () => {
  form.sku = "";
  form.nombre = "";
  form.descripcion = "";
  form.marca = "";
  form.referencia = "";
  form.stock = 0;
  form.modelo = "";
  form.costoAnterior = 0;
  form.costoActual = 0;
  form.precio1 = 0;
  form.precio2 = 0;
  form.precio3 = 0;
  form.utilidad1 = 30;
  form.utilidad2 = 25;
  form.utilidad3 = 20;
  error.value = "";
};

const formatPrice = (value) => {
  return `$${value.toFixed(2)}`;
};
</script>

<style scoped>
.form-group {
  @apply space-y-1.5;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

.label-required {
  @apply block text-sm font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500;
}

.form-input {
  @apply block w-full rounded-md border-gray-300 shadow-sm 
         focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
         transition duration-150 ease-in-out;
}

.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-colors duration-200
         focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-ghost {
  @apply text-gray-700 bg-white border border-gray-300
         hover:bg-gray-50 focus:ring-gray-500;
}

.btn-primary {
  @apply text-white bg-blue-600 border border-transparent
         hover:bg-blue-700 focus:ring-blue-500;
}

.btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Eliminar flechas de inputs numéricos */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.confirmation-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] backdrop-blur-sm;
}

.confirmation-popover {
  @apply bg-white rounded-xl shadow-2xl border border-gray-200;
  width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.confirmation-title {
  @apply text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center;
}

.confirmation-title::before {
  content: "";
  @apply w-1 h-6 bg-blue-600 rounded mr-3;
}

.confirmation-content {
  @apply p-6;
}

.confirmation-row {
  @apply flex justify-between items-center py-2 border-b border-gray-100;
}

.confirmation-label {
  @apply text-sm font-medium text-gray-600;
}

.confirmation-value {
  @apply text-sm text-gray-900;
}

.confirmation-actions {
  @apply flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200;
}

.confirm-button {
  @apply px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200;
}

.cancel-button {
  @apply px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300
         hover:bg-gray-50 focus:ring-gray-500;
}
</style>
