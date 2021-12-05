import User from '../models/User.js';
import bcrypt from 'bcrypt';

import { createAccessToken } from '../middlewares/auth.js';

// GET ALL USERS
export const getAllUsers = async (req, res) => {
    const users = await User.find();
    if(users) {
        res.status(200).json(users);
    } else {
        res.status(404).json("Error");
    }
}

// Get single user
export const getSingleUser = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if(user) {
        user.password = '';
        res.status(200).json(user);
    } else {
        res.status(404).json("Error");
    }
}

// REGISTER
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    if(firstName.length < 3){
        res.json({"alert": "First Name must be 3 or more letters"});
    } else if(lastName.length < 2) {
        res.json({"alert": "Last Name must be 2 or more letters"});
    } else if(!email.length) {
        res.json({"alert": "Enter your Email"});
    } else if(password.length < 8) {
        res.json({"alert": "password should be 8 or more letters"});
    } else {
        const result = await User.findOne({ email: req.body.email });
        if(result === null){
            const salt = 12;
            const userPassword = req.body.password;
            const hashedPassword = await bcrypt.hash(userPassword, salt);
            const newUser = {
                ...req.body,
                password: hashedPassword
            }
            const registeredUser = new User(newUser);
            registeredUser.save((err, result) => {
                if(err) {
                    return res.json(err);
                } else {
                    return res.json(
                        {
                            "message": `Registration is Successful! Redirecting you now to login page.`,
                            result
                        }
                    );
                }
            });
        } else {
            return res.status(404).json({"alert": "user already exist"});
        }
    }
}

// LOGIN
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const dbUser = await User.findOne({email});
    
    if(dbUser){
        const isPassValid = await bcrypt.compare(password, dbUser.password);
        if(isPassValid) {
            const token = createAccessToken(dbUser);
            res.status(200).json(
                { 
                    result: dbUser, 
                    token, 
                    message: "Successfully logged in! redirecting you now to homepage" 
                }
            );
        } else {
            res.status(404).json({ "alert": `Invalid Password` })
        }
    } else {
        res.status(404).json({ "alert": `Email is not registered` });
    }
}

// UPDATE USER
export const updateUser = async (req, res) => {
    const result = await User.findById(req.params.userId);
    if(result) {
        await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        res.json(
            {
                message: `${result.firstName} is now updated`,
                bool: true
            }
        )
    } else {
        res.json(
            {
                alert: `We can't find the user`,
                bool: false
            }
        )
    }
}


// DELETE USER
export const deleteUser = async (req, res) => {
    const result = await User.findById(req.params.userId);
    if(result) {
        await User.findByIdAndDelete(req.params.userId);
        res.json(
            {
                message: `deleted ${result.email}`,
                bool: true
            }
        )
    } else {
        res.json(
            {
                alert: `We can't find the user`,
                bool: false
            }
        )
    }
}


// ADD ITEM TO CART 
export const addCartItem = async (req, res) => {
    const { userId, productName, productBrand, productPrice, productImage, qty } = req.body;
    const cartItem = { productName, productBrand, productPrice, productImage, qty };
    const result = await User.findById(userId);
    if(result){
        if(result.cartItems.length >= 1){
            const matchedName = result.cartItems.filter(userCart => userCart.productName === cartItem.productName);
            const matchedBrand = result.cartItems.filter(userCart => userCart.productBrand === cartItem.productBrand);

            if(matchedName.length === 0){
                result.cartItems.push(cartItem);
            } else if(matchedName && matchedBrand) {
                result.cartItems.forEach(userCart => {
                    if(userCart.productName === cartItem.productName && userCart.productBrand === cartItem.productBrand) {
                        if(req.body.act === "inc"){
                            userCart.qty += 1; 
                        } else if(req.body.act === "dec"){
                            userCart.qty -= 1; 
                        } else {
                            userCart.qty += 1; 
                        }
                    }
                })
            }   
        } else if(result.cartItems.length === 0) {
            result.cartItems.push(cartItem);
        }
        await User.findByIdAndUpdate(userId, {cartItems: result.cartItems}, { new: true });
        res.json(
            {
                message: `${productName} is now added to ${result.firstName}'s Cart.`,
                bool: true
            }
        )
    } else {
        res.json(
            {
                message: `We can't find user.`,
                bool: false
            }
        )
    }
}

// GET CART ITEMS
export const getCartItems = async (req, res) => {
    const result = await User.findById(req.params.userId);
    if(result){
        res.json({cartItems: result.cartItems, bool: true});
    } else {
        res.json(
            {
                message:`Please Log in`,
                bool: false
            }
        )
    }
}


// Delete CART ITEM
export const deleteCartItem = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if(user) {
        const updatedCart = user.cartItems.filter(cartItem => cartItem.productName !== req.body.prodName);
        user.cartItems = updatedCart;
        await User.findByIdAndUpdate(req.params.userId, user, { new: true });
        console.log();
        res.json(
            {
                message: `${req.body.prodName} is now removed from your cart.`, 
                bool: true
            }
        );
    } else {
        res.json(
            {
                message:`Please Log in`,
                bool: false
            }
        )
    }
}