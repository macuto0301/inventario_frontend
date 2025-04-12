import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./index.css";

// Import views
import ProductosView from "./views/ProductosView.vue";
import AgregarView from "./views/AgregarView.vue";
import EditarProductoView from "./views/EditarProductoView.vue";

// Define routes
const routes = [
  { path: "/", component: ProductosView },
  { path: "/agregar", component: AgregarView },
  { path: "/editar/:id", component: EditarProductoView },
];

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create and mount app
createApp(App).use(router).mount("#app");
