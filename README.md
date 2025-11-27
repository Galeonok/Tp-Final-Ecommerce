TP-Final- E-commerce API
API para gestión de un sistema de ABM desarrollada con Node.js, Express y MongoDB/Atlas. Permite la administración de productos, usuarios y categorías (Alta, baja y modificación).
Descripción
Sistema backend completo que incluye autenticación de usuarios, gestión de productos, con validaciones y seguridad mediante JWT.
---
Esquema de Base de Datos
Colección “user”: { _id: ObjectId, name: String, lasName: String, age: Number, email: String (único, requerido), password: String (hasheado, requerido), createdAt: Date, updatedAt: Date}
Colección “product”: { _id: ObjectId, name: String (requerido), price: Number (requerido,min:0), profitRate: Number, description: String, status: String, // "AVAILABLE" | "NOT AVAILABLE" | "DISCONTINUED" (Default: AVAILABLE), highlighted: Boolean, category: ObjectId (requerido), stock: Number (default: 0), highlighted: Boolean (default: true), createdAt: Date, updatedAt: Date}
Colección: “category”: { _id: ObjectId, name: String (requerido), createdAt: Date, updatedAt: Date }
---
Tecnologías Utilizadas
- Node.js: Entorno de ejecución
- Express.js v5.1.0: Framework web
- MongoDB: Base de datos NoSQL
- Mongoose v8.19.4: ODM para MongoDB
- bcrypt v6.0.0: Encriptación de contraseñas
- jsonwebtoken v9.0.2: Autenticación JWT
- express-session v1.18.2: Manejo de sesiones
- cors v2.8.5: Control de acceso CORS
- body-parser v2.2.0: Parseo de body requests
- dotenv v17.2.3: Variables de entorno
- nodemon v3.1.11: Auto-reload en desarrollo
- npm-check-updates v19.1.2: Actualización de dependencias
---
Instalación y Ejecución
Requisitos Previos
- Node.js >= 18.0.0
- MongoDB (local o Atlas)
- npm >= 8.12.1

1. Clonar el repositorio: git clone https://github.com/Galeonok/Tp-Final-Ecommerce.git (cd ecommerce.
2. Instalar dependencias: npm install.
3. Configurar variables de entorno: Crear un archivo “.env” en la raíz del proyecto:
.env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/TP-Final-Ecommerce?appName=Cluster0
SECRET= ***
*Nota: Reemplaza y con tus credenciales de MongoDB Atlas.
4. Ejecutar el proyecto
Modo desarrollo (con nodemon): npm run dev
Modo producción: npm start
---
Endpoints de la API
-	Base URL: `http://localhost:3000/api
Autenticación (Auth)
Registro de usuario: POST /api/user/ - { “name”: “Juan”, “lastName”: “Perez”, “age”: “88”, "email": "juan@example.com", "password": "password123" } || Respuesta exitosa (201): {   "message": "User Created Succesfully" },
Login de usuario: POST /api/user/login - { "email": "juan@example.com", "password": "password123" } || Respuesta exitosa (200): { "message": "Logged In", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...", }
---
Productos (Products)
 Obtener todos los productos: GET /api/products/ || Respuesta exitosa (200): { "_id": "6927d2db37a866e2461a0922", "name": "comedero mediano", "price": 2000, "profitRate": 1.3,    "description": "El mejor regalo para tu mascota", "status": "AVAILABLE", "category": { "_id": "6927cee29653b895995ade8b", "name": "comederos", ”createdAt": "2025-11-27T04:09:06.413Z", "updatedAt": "2025-11-27T04:09:06.413Z", "__v": 0 }
Obtener un producto por ID: GET /api/products/:id
Crear producto: POST /api/products/ - { "name": "Tazas Personalizadas de Plastico", "description": "Elegi que qures estamparle a tu taza que lo hacemos", "costPrice": 5000, "profitRate": 1.5, "stock": 15, "status": "AVAILABLE", "highlighted": false, "category": "6927d1429653b895995adea7" }
Actualizar producto: PUT /api/products/update/:id - Body (Todos los campos opcionales): {
  "name": "Mouse Gaming RGB Pro", "price": 59.99, "stock": 45 }
Eliminar producto: DELETE /api/product/:id
---
Autenticación: La API utiliza **JWT (JSON Web Tokens)** para autenticación. Para acceder a rutas protegidas: 1. Registrarse o hacer login | 2. Usar el token recibido en el header “Authorization”: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
---
Ejemplos de Datos Mock
Producto: { _id: 6927d2a937a866e2461a0920, Name: "shampoo para pulgas x 500mg", Price: 5000, profitRate: 1.3, description: "El mejor regalo para tu mascota", status: "AVAILABLE", category: 691e9162bb36d3ff4ee4349a, stock: 7, highlighted: false, __v: 0 }
Usuario: { _id: 6927cf949653b895995ade93, name: "gabriel", lastName: "galeano", age: 53, email: gabogaleano@gmail.com, password: "$2b$10$74xaIqJDSm0kLNU…", createdAt: 2025-11-27T04:12:04.266+00:00, updatedAt:2025-11-27T04:12:04.266+00:00 }
Category: { _id: "6927ce9c9653b895995ade85", name: "comida", createdAt": "2025-11-27T04:07:56.903Z", updatedAt: "2025-11-27T04:07:56.903Z", __v: 0 }
---
Estructura del Proyecto
TP-Final-Ecommerce/
├── api/
├── src/
│   ├── controllers/      # Lógica de controladores
│   ├── models/          # Modelos de Mongoose
│   ├── routes/          # Definición de rutas
│   ├── middlewares/     # Middlewares (auth, validación)
│   └── index.js         # Punto de entrada
├── .env                 # Variables de entorno (no incluir en git)
├── .gitignore          
├── config.js            # Configuración de la app
├── db.js               # Conexión a MongoDB
├── package.json
└── vercel.json         # Configuración de Vercel
---
Contacto Trabajo Práctico Final - UTN Backend Gabriel Galeano 11-6031-7829 - gabogaleano@gmail.com Año: 2025
