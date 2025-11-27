import express from 'express';
import { createCategoryController, deleteCategoryController, getAllCategoriesController } from '../controllers/categoryController.js';

export const categoryRoute = express.Router();

categoryRoute.post("/", createCategoryController);
categoryRoute.get("/", getAllCategoriesController);
categoryRoute.delete("/:id", deleteCategoryController);


//CLASE 14 - 01:45:15 (Para comenzar con el producto)