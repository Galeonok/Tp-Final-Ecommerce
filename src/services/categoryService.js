import Category from "../models/categoryModel.js";

//Servicio para crear una nueva categoría   
export const createCategoryService = async (categoryData) => {
    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();
    return savedCategory;
}

export const getAllCategoriesService = async () => {
    const categories = await Category.find();
    if (categories.length === 0) {
        const error = new Error("No categories found");
        error.statusCode = 204;
        throw error;
    }
    return categories;
}

export const deleteCategoryService = async (id) => {
    const categoryExist = await Category.findOne({ _id: id });
    if (!categoryExist) {
        const error = new Error(`Category with ID ${id} not found`);
        error.statusCode = 400;
        throw error;
    }
    const deletedCategory = await Category.deleteOne({ _id: id });
    return { categoryDeleted: categoryExist }
}