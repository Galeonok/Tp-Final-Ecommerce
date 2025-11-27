import {
    createProductService,
    deleteProductService,
    findProductByIdService,
    findProductByNameService,
    getAllProductsService,
    getStatusService,
    updateProductService
} from "../services/productService.js";

export const createProductController = async (req, res) => {
    try {
        const productData = req.body;
        const savedProduct = await createProductService(productData);
        return res.status(200).json({ message: "new product created", savedProduct });
    } catch (error) {
                if (error.code === 11000) {
            //Busca de la key con error el value
            const field = Object.keys(error.keyValue)[0]
            const value = error.keyValue[field]
            return res.status(400).json({ message: `User with ${field}: ${value} already exists` })
        }
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProductsService();
        return res.status(200).json(products);
    } catch (error) {
        if (error.statusCode === 204) {
            return res.sendStatus(204)
        }
        if (error.statusCode === 400) {
            return res.status(400).json({ message: error.message })
        }
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const findProductsByNameController = async (req, res) => {
    try {
        const productsFound = req.body.name; // ?name=laptop
        const products = await findProductByNameService(productsFound);
        res.status(200).json({
            message: `Found ${products.length} product(s)`,
            count: products.length,
            products
        });

    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).json({ message: error.message });
        }
        res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}

export const findProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await findProductByIdService(id);
        res.status(200).json(product);
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).json({ message: error.message });
        }
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedProduct = await updateProductService(id, updateData);
        return res.status(201).json({ message: "Product updated", updatedProduct });
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await deleteProductService(productId);
        res.status(201).json(deletedProduct);
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getStatusController = async (req, res) => {
    try {
        const status = await getStatusService();
        return res.status(200).json(status);  
    } catch (error) {   
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
