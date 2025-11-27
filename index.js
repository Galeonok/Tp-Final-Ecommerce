import bodyParser from "body-parser";
import express from "express";
import { connectDB } from "./db.js";
import { PORT, SECRET } from "./config.js";
import { userRouter } from "./src/routes/userRoute.js";
import session from "express-session";
import { categoryRoute } from "./src/routes/categoryRoute.js";
import { productRoute } from "./src/routes/productRoute.js";
import cors from "cors";

//Instancia servidor EXPRESS 
//Definir al principio
const app = express()

//CORS (Permite que BackEnd pueda recibir solicitudes del frontend)
app.use(cors({
    origin: "*", //Permitir solicitudes desde cualquier ip:puerto
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], //metodos permitidos
    credentials: true //Permitir el uso de cookies y credenciales
}));

connectDB()

//Middleware (Soft intermedio)
app.use(bodyParser.json())

//Se genera el uso de la sesion
app.use(
    session({
        secret: SECRET, //Dato unico de sistema.
        resave: false, // Evita que sesion se vuelva a guardar.
        saveUninitialized: false,//Evita que se guarde una sesion no inicializada. 
    })
)

//Rutas base (Base Path):
app.use("/api/user", userRouter)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)


//Permite parsear el cuerpo de solicitud para ser leida por "req.body"
app.use(bodyParser.urlencoded({ extended: true }))

//Escucha de Servidor
app.listen(PORT, () => {
    console.log(`Server is running on Local Host ${PORT}`)
});
