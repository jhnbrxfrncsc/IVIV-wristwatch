import express from 'express';
import * as userController from '../controllers/userControllers.js';

const router = express.Router();

// login/register
router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);

// api
router.get('/get-users-api', userController.getAllUsers);
router.get('/get-user/:userId', userController.getSingleUser);
router.put('/edit-user/:userId', userController.updateUser);
router.delete('/delete-user/:userId', userController.deleteUser);

// cart
router.get('/get-cart-items/:userId', userController.getCartItems);
router.put('/add-cart-item', userController.addCartItem);
router.put('/remove-cart-item/:userId', userController.deleteCartItem);

export default router;