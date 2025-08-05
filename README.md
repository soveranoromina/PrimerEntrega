# PrimerEntrega
Primer entrega del curso - Programación Backend I: Desarrollo Avanzado de Backend #76500

## 🎯 Objetivos de la entrega

Desarrollar un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra para tu API.

## Desarrollo del Servidor
El servidor debe estar basado en Node.js y Express, y debe escuchar en el puerto 8080. Se deben disponer dos grupos de rutas: /products y /carts. Estos endpoints estarán implementados con el router de Express.

La API estará disponible en `http://localhost:8080` con los siguientes endpoints:
- `GET /api/products/` - Obtener todos los productos
- `POST /api/products/` - Crear un nuevo producto
- `GET /api/products/:id` - Obtener un producto por ID
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar un producto
- `GET /api/carts/:id` - Obtener productos de un carrito
- `POST /api/carts/` -  Crear un carrito vacío
- `POST /api/carts/:cid/product/:pid` - Agregar un producto a un carrito

## Build
```bash
npm run build
```

## Ejecución
```bash
npm run start
```