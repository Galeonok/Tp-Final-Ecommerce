//Mongoose es el ODM (Tecnica prog para comunicarse con DB)
import mongoose from "mongoose";
import { ECOMMERCE_DB, MONGODB_URI } from "./config.js";

//CAMBIAR Nombre de DB (e-commerse segun proyecto)
//Localhots se cambia por 127.0.0.1
export const connectDB = async () => {
    try{
        await mongoose.connect(`${MONGODB_URI}/${ECOMMERCE_DB}`)
                console.log ("Datadase connected")
    }catch (error){
        console.log("Error connecting Database", error)
        //PAra salir de ejecucion
        process.exit(1)
    }
}