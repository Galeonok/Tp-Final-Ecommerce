import jwt from "jsonwebtoken"
import { SECRET } from "../../config.js"

export function verifyToken (token){
    try {
        //Decodificamos
         const decoded = jwt.verify(token, SECRET)
         return decoded
    } catch (error){
        throw new Error("Invalid Token")
    }
}

