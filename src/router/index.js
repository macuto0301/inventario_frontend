import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductosView from "@/views/ProductosView.vue";
import AgregarProductoView from "@/views/AgregarProductoView.vue";
import EditarProductoView from "@/views/EditarProductoView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/productos",
    name: "productos",
    component: ProductosView,
  },
  {
    path: "/productos/agregar",
    name: "agregar-producto",
    component: AgregarProductoView,
  },
  {
    path: "/productos/:id/editar",
    name: "editar-producto",
    component: EditarProductoView,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
