import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is Required"]
    },
    productBrand: {
        type: String,
        required: [true, "Product Brand is Required"]
    },
    productDesc: {
        type: String,
        required: [true, "Product Description is Required"]
    },
    productPrice: {
        type: Number,
        required: [true, "Product Price is Required"]
    },
    productDiscount: {
        type: Number,
        required: [true, "Product Discount Percentage is Required"]
    },
    productImage: [ String ],
    isActive: {
        type: Boolean,
        default: false
    },
    orders : [
        {
            userId: {
                type: String,
                required: [true, "User ID is Required"]
            },
            orderId: {
                type: String,
                required: [true, "Order ID is Required"]
            },
            purchaseDate: {
                type: Date,
                default: new Date().toISOString().split('T')[0]
            }
        }
    ]
}, { timestamps: true });


export default mongoose.model("Product", productSchema);