# Sistema de Inventario - Frontend

Este es el frontend del sistema de gestión de inventario desarrollado con Vue 3 y Tailwind CSS.

## Características

- 📦 Gestión de productos (Crear, Leer, Actualizar, Eliminar)
- 💰 Cálculo automático de utilidades
- 🔍 Búsqueda de productos
- 📊 Resumen de valores totales
- 💼 Interfaz moderna y responsiva

## Tecnologías Utilizadas

- Vue 3
- Vue Router
- Tailwind CSS
- Vite

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/macuto0301/inventario_frontend.git
cd inventario_frontend
```

2. Instalar dependencias:

```bash
npm install
# o
yarn install
```

3. Crear archivo .env con la configuración:

```env
VITE_API_URL=http://localhost:3001/productos
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

El servidor estará disponible en `http://localhost:5173`

## Construcción para Producción

Para construir la aplicación para producción:

```bash
npm run build
# o
yarn build
```

## Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
├── services/         # Servicios y llamadas a la API
├── views/            # Vistas/Páginas
├── App.vue           # Componente raíz
└── main.js          # Punto de entrada
```

## Características del Formulario de Productos

- SKU o código único
- Nombre del producto
- Descripción
- Precio de compra
- Precio de venta
- Stock
- Cálculo automático de utilidad

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
