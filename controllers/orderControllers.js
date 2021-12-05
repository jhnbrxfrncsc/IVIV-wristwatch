import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const getAllOrders = async (req, res) => {
    const orders = await Order.find().sort({ createdAt: 1 });
    if(orders) {
        res.json(orders);
    } else {
        res.json({
            bool: false,
            message: `Orders is empty`
        })
    }
}

export const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    newOrder.save(async (err, result) => {
        if(err) {
            return res.send(err);
        } else {
            const user = await User.findById(req.body.userId);
            if(user){
                // Saving order to user
                const userOrders = {
                    orderId: result._id,
                    products: req.body.products,
                    totalAmount: req.body.totalAmount,
                    purchaseDate: req.body.purchaseDate
                }
                await User.findByIdAndUpdate(req.body.userId, {cartItems: [], orders: [...user.orders, userOrders]} ,{ new: true });
                console.log(user.cartItems);

                // saving to product model
                const productOrder = {
                    orderId: result._id,
                    userId: req.body.userId,
                    purchaseDate: req.body.purchaseDate
                }
                req.body.products.forEach(async (product) => {
                    const prodRes = await Product.findOne({ productName: product.productName });
                    if(prodRes){
                        await Product.findByIdAndUpdate(prodRes._id, {orders: [...prodRes.orders, productOrder]} ,{ new: true });
                    } else {
                        console.log("can't find the product");
                    }
                })
                return res.json(
                    {
                        message: `new order for ${user.email}`,
                        bool: true
                    }
                );
            } else {
                return res.json(
                    {
                        message: `Can't find the user`,
                        bool: false
                    }
                );
            }
        }
    });
}


export const getUserOrder = async(req, res) => {
    const user = await User.findById(req.params.userId);
    if(user){
        res.json({orders: user.orders});
    } else {
        res.json({
            message: "There's an error",
            bool: false
        })
    }
}