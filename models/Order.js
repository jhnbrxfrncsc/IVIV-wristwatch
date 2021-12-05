import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User ID is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"]
    },
    totalAmount: {
        type: Number,
        required: [true, "Total amount of order is Required"]
    },
    products: [
        {
            productName: {
                type: String,
                required: [true, "Product name is Required"]
            },
            productBrand: {
                type: String,
                required: [true, "Product brand is Required"]
            },
            qty: {
                type: Number,
                required: [true, "Quantity is Required"]
            }
        }
    ],
    purchaseDate: {
        type: Date,
        default: new Date().toISOString().split('T')[0]
    }
}, { timestamps: true });


export default mongoose.model("Order", orderSchema);