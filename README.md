# Proyecto amaiie (en japonés "dulce hogar")

Web app: plataforma para dar visibilidad a piezas únicas realizadas artesanalmente, marketplace de artistas para difusión y venta de sus obras artísticas

# Tecnología utilizada para el proyecto

MERN
API
Node.js
Express
BASE DE DATOS
Mondodb
FRONTEND
React

# Librerías Instaladas

BACKEND
Mongoose (base de datos)
Express (API)
Nodemon (server)
Multer (carga de archivos)
Path(Rutas)
Bcryptjs(contraseñas)
Dotenv(archivo .env)
Jsonwebtoken (token)
Axios (solicitudes HTTP)
FRONTEND
Helmet-async(head tags)
Scripts (tareas)
React-Router-Dom (rutas de los componentes)
React-Bootstrap (estilo de componentes)
React-toastify (alertas emergentes)
Axios (solicitudes HTTP)

# Fases del Proyecto

# Backend (MongoDB, Node.js, Express)

Contenedor Docker para Node.js y MongoDB
MODELS
Esquema de la estructura de datos de Users,Products y Orders que se almacenan en la base de datos de MongoDB
ROUTES
1.Orders: creación de pedidos que nos devuelve un objeto con los elementos del pedido, obtener y guardar pedido con un id específico, marcar un pedido como pagado y guardar el estado del pedido en la base de datos
2.Products: permite filtrar por categoría y precio, buscar por producto, guardar, actualizar, borrar, listar y obtener producto con un id específico
3.Seed: Inicialización de datos de prueba en la base de datos
4-Users: Autentificación, obtención de productos por usuario, registro de nuevos usuarios, actualización y edición de perfiles de usuarios
MIDDLEWARES
1.Conexión a Moongose server
2.Conexión a Express server
3.Multer para carga de archivos
4.En index.js están los middlewares de las 4 rutas (orders, products,seed,users), de la pasarela de pago Paypal, de la carpeta publicback con las imágenes y de los errores del servidor
5.En utils.js están los middlewares para verificar que los usuarios y el admin están autentificados

# Frontend (React)

COMPONENTES
1.Routes: verificación delos perfiles de los usuarios (user, artist, admin) para establecer permios de acceso al contenido de las diferentes rutas.
2.Loading Box: carga de la página web
3.MessageBox: ventanas emergentes de alerta y notificaciones
4.Producto: buscador, filtros y proceso completo de registro, añadir al carrito, pagar y enviar pedido.
SCREENS
1.HOME: Home, galería de productos por categoría, producto por artista y perfil del artista.
2.USERS: Perfil, listado, registro y login.
3.PRODUCT: Crear, listar, buscar, borrar, editar y añadir al carrito.
4.CART: pedidos, vista previa de pedidos, listados, pago y envío.
5.ABOUT US: Contacto, aviso legal, privacidad y cookies.




copiar archivo para q este dentro del contenedor
docker cp users.json mongo-amaiie:/tmp/users.json
docker cp products.json mongo-amaiie:/tmp/products.json

importa a la base de datos los archivos.
docker exec mongo-amaiie mongoimport -d mongo-amaiie -c users --file /tmp/users.json --jsonArray
docker exec mongo-amaiie mongoimport -d mongo-amaiie -c products --file /tmp/products.json --jsonArray
