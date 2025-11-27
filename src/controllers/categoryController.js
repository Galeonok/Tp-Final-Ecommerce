import { createCategoryService, deleteCategoryService, getAllCategoriesService } from "../services/categoryService.js";

export const createCategoryController = async (req, res) => {
    try {
        const categoryData = req.body;  
        const savedCategory = await createCategoryService(categoryData);
        return res.status(201).json({message: "new category created", savedCategory});
    } catch (error) {
                if (error.code === 11000) {
            //Busca de la key con error el value
            const field = Object.keys(error.keyValue)[0]
            const value = error.keyValue[field]
            return res.status(400).json({ message: `Category with ${field}: ${value} already exists` })
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await getAllCategoriesService();
        return res.status(200).json( categories );     
    } catch (error) {
        if (error.statusCode === 204) {
            return res.json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteCategoryController = async (req, res) => {
    try {
        const CategoryId = req.params.id;
        const deletedCategory = await deleteCategoryService(CategoryId);
        return res.status(200).json( deletedCategory );
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(error.statusCode).json({ message: error.message });   
        }   
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};