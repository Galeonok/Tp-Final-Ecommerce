import express from 'express'
import {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
    validate
} from '../controllers/userController.js'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js'


//Enrutador:
export const userRouter = express.Router()

//Endpoints (Enrutador + Verbo http + Path + Controlador):
userRouter.post("/", createUser)
userRouter.get("/", getUsers)
userRouter.delete("/:id", verifyTokenMiddleware, deleteUser)
userRouter.put("/:id", verifyTokenMiddleware, updateUser)
userRouter.post("/login", validate)
