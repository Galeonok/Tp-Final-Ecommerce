import mongoose from "mongoose";
import { isGoodPassword } from "../utils/validators.js";
import bcrypt from "bcrypt"

//Se crea esquema  de usuario
const userSchema = new mongoose.Schema({
    //Atributos
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minLength: 5,
        //regex:
        match: /^\S+@\S+\.\S+$/,
    },    
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value){
                return isGoodPassword(value)
            },
            message: "Password must be between 6-12 characters, with at least 1 number, 1 upercase letter and 1 lowercase letter"
        }
    }
},
//Registra y muestra cuando se crea y modifica este esquema (createdAt, updatedAt)
{timestamps: true}
)
//MIDDLEWARE: Se encripta el password
userSchema.pre("save", function (next){
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})


//Se exporta modelo:
export default mongoose.model("user", userSchema)