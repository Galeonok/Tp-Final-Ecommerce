import express from "express";
import {
    createProductController,
    deleteProductController,
    findProductByIdController,
    findProductsByNameController,
    getAllProductsController,
    getStatusController,
    updateProductController
} from "../controllers/productController.js";

export const productRoute = express.Router();

productRoute.post("/", createProductController);
productRoute.get("/", getAllProductsController);
productRoute.get("/status", getStatusController);
productRoute.get('/search', findProductsByNameController);
productRoute.get('/:id', findProductByIdController);
productRoute.put("/update/:id", updateProductController);
productRoute.delete("/:id", deleteProductController);

