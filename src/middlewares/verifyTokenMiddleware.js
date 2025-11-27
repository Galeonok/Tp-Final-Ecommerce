//Lee el Token y valida que este ok para continuar
import { verifyToken } from  '../utils/verifyToken.js'

export const verifyTokenMiddleware = (req, res, next) => {
    try {
        //Lee el token desde el request
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            res.status(400).json({message: "There is no token created"})
        }
        //Se separa Bearer de token
        const token = authHeader.split(" ")[1]
        //Se decodifica (Se valida si es valido o no)
        const decoded = verifyToken (token)
        console.log ({decoded})
        req.user = decoded
        next()
    }catch (error) {
        return res.status(400).json({ message: "Invalid acces token", error: error.message })
    }
}

