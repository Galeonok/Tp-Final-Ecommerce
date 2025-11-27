import { createUserService, deleteUserService, getUsersService, updateUserService, validateUserService } from "../services/userService.js";
//Todo objeto tiene "key: value" ---> EJ: email(key): gaboga@gmail.com(value)
//Aca se crea el CRUD - Intermediario entre Clinte y logica de App (Recibe solicitudes y responde).
export const createUser = async (req, res) => {
    try {
        const response = await createUserService(req.body)
        res.status(201).json({ message: "User Created Succesfully" });
    } catch (error) {
        if (error.code === 11000) {
            //Busca de la key con error el value
            const field = Object.keys(error.keyValue)[0]
            const value = error.keyValue[field]
            return res.status(400).json({ message: `User with ${field}: ${value} already exists` })
        }
        return res.status(500).json({ message: "Internal server Error", error: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService()
        //200 operacion exitosa
        res.status(200).json(users)
    } catch (error) {
        if (error.statusCode === 204) {
            return res.sendStatus(error.statusCode)
        }
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        //api/user/delete/:id
        const userId = req.params.id
        const result = await deleteUserService(userId)
        return res.status(200).json(result)
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(error.statusCode).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const updatedUser = await updateUserService(userId, req.body)
        return res.status(201).json(updatedUser)
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

//Autenticacion de user
export const validate = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await validateUserService(email, password)
        return res.status(200).json(result)
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(error.statusCode).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
