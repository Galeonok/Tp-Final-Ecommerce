import Product, { statusEnum } from "../models/productModel.js";
import mongoose from "mongoose";

export const createProductService = async (productData) => {
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return savedProduct;
}

export const getAllProductsService = async () => {
    const products = await Product.find().populate("category");
    if (products.length === 0) {
        const error = new Error("No products found");
        error.statusCode = 204;
        throw error;
    }
    return products;
}

export const findProductByNameService = async (productName) => {
    const products = await Product.find({
        name: { $regex: productName, $options: 'i' }
    });
    if (!productName || productName.trim() === '') {
        const error = new Error('Product name is required');
        error.statusCode = 400; // Bad Request
        throw error;
    }
    if (products.length === 0) {
        const error = new Error(`No product found with name "${productName}"`);
        error.statusCode = 400; // Not Found
        throw error;
    }

    return products;
}


export const findProductByIdService = async (productId) => {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        const error = new Error(`Invalid product ID format: "${productId}"`);
        error.statusCode = 400; // Bad Request (ID inválido)
        throw error;
    }

    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error(`Product with ID "${productId}" not found`);
        error.statusCode = 400;
        throw error;
    }

    return product;
}


export const updateProductService = async (productId, updateData) => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) {
        const error = new Error(`Product with ID "${productId}" not found`);
        error.statusCode = 400;
        throw error;
    }
    return updatedProduct;
}

export const deleteProductService = async (productId) => {
    const productExist = await Product.findOne({ _id: productId });
    if (!productExist) {
        const error = new Error(`Product with ID "${productId}" not found`);
        error.statusCode = 400;
        throw error;
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return { message: "Product Deleted succesfully", deletedProduct };
}

export const getStatusService = async () => {
    return statusEnum;
};