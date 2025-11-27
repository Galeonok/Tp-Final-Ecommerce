import mongoose from "mongoose";

export const statusEnum = ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED"];

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"],
    },
    profitRate: {
        type: Number,
        default: 1.5,
        required: [true, "Profit margin is required"],
        min: [1, "Profit rate must be greater than or equal 1"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
        maxLength: [300, "Description cannot exceed 300 characters"],
    },
    status: {
        type: String,
        validate: {
            validator: function (value) {
                return statusEnum.includes(value);
            },
            message: props => `${props.value} is not a valid status`
        },
        default: "AVAILABLE",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: [true, "Product category is required"],
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Stock cannot be negative"],
        default: 0,
    },
    highlighted: {
        type: Boolean,
        default: false,
    },
});

//Metodo de disminucion de Stock:
//Disminuye el stock del producto en la cantidad especificada
//No hace falta exportar el metodo, ya que se usa a traves del modelo
productSchema.methods.decreaseStock = async function (quantity) {
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }
    if (quantity > this.stock) {
        throw new Error("Insufficient stock");
    }
    this.stock -= quantity
    await this.save();
}

//Atributos virtuales
productSchema.virtual("priceWithProfitRate").get(function () {
    return this.price * this.profitRate;
});

//Configuracion para incluir virtuals en JSON y Object 
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });



export default mongoose.model("product", productSchema);

/* name, price, profitRate, description, status, category, stock, hilighted */