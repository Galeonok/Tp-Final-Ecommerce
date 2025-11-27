import { SECRET } from "../../config.js";
import User from "../models/userModel.js"
import { findUserByIdAndCheck } from "../utils/userHelpers.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const createUserService = async (userData) => {
    //Se crea y guarda el User
    const newUser = new User(userData);
    await newUser.save()
    return { message: "User Created" }
}

export const getUsersService = async () => {
    const users = await User.find()
    if (users.length === 0) {
        //Se arma error con su mensahe y codigo de estado:
        const error = new Error("There are no users")
        error.statusCode = 204
        throw error
    }
    return users
}

export const deleteUserService = async (userId) => {
    await findUserByIdAndCheck(userId)
    await User.findByIdAndDelete(userId)
    return { message: "User deleted succefully" }
}

export const updateUserService = async (userId, updateData) => {
    await findUserByIdAndCheck(userId)
    //new:true = devuelve el doc modificado y actualizado
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true })
    //return updatedUser;
    return { message: "User updated succefully", updatedUser}
}

export const validateUserService = async (email, password) => {
    if (!(email && password)) {
        const error = new Error("There is a missing field")
        error.statusCode = 400;
        throw error
    }
    const userFound = await User.findOne({ email })

    if (!userFound) {
        const error = new Error("User or Password are incorrect")
        error.statusCode = 400;
        throw error
    }
    //Se compara password guardada con la recibida
    //Recibe y encripta nuevo password y la compara con la guardada
    if (!bcrypt.compareSync(password, userFound.password)) {
        const error = new Error("User or Password are incorrect")
        error.statusCode = 400;
        throw error
    }
    //Se genera el payload (Info a guardar en TOKEN)
    const payload = {
        userId: userFound._id,
        userEmail: userFound.email
    }

    //Token debe ser firmado (Con paylod, secret y duracion):
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" })
    return { message: "Logged In", token }
}  