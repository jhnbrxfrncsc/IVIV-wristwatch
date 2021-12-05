import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cartItems: [ 
        {
            productName: {
                type: String,
                required: [true, "Product name is Required"]
            },
            productBrand: {
                type: String,
                required: [true, "Product brand is Required"]
            },
            productPrice: {
                type: Number,
                required: [true, "Product price is Required"]
            },
            productImage: {
                type: String,
                required: [true, "Product image is Required"]
            },
            qty: {
                type: Number,
                required: [true, "Quantity is Required"]
            }
        }
    ],
    orders: [
        {
            orderId: {
                type: String,
                required: [true, "Order ID is required"]
            },
            products: [
                {
                    productId: {
                        type: String,
                        required: [true, "Product ID is Required"]
                    },
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
            totalAmount: {
                type: Number,
                required: [true, "Total Amount of order is required"]
            },
            purchaseDate: {
                type: Date,
                default: new Date().toISOString().split('T')[0]
            }
        }
    ]
}, { timestamps: true });


export default mongoose.model("User", userSchema);