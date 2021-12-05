import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../middlewares/upload.js';

import * as adminController from '../controllers/adminControllers.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, ".." ,"public");
const router = express.Router();

router.use(express.static("public"));

// Profile
router.get('/profile', (req, res) => {
    res.sendFile(path.join(staticPath, "adminProfile.html"));
});

// Products
router.get('/products', (req, res) => {
    res.sendFile(path.join(staticPath, "adminProducts.html"));
});
router.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"));
});
router.get("/product-upload", (req, res) => {
    res.sendFile(path.join(staticPath, "addProdImages.html"));
})
router.get("/edit-product", (req, res) => {
    res.sendFile(path.join(staticPath, "editProduct.html"));
})
router.get("/active-products", (req, res) => {
    res.sendFile(path.join(staticPath, "activeProducts.html"));
})
router.get("/archive-products", (req, res) => {
    res.sendFile(path.join(staticPath, "archiveProducts.html"));
})
router.get("/edit-user", (req, res) => {
    res.sendFile(path.join(staticPath, "editUser.html"));
})
router.get("/blank", (req, res) => {
    res.sendFile(path.join(staticPath, "blank.html"));
})
router.get("/my-orders", (req, res) => {
    res.sendFile(path.join(staticPath, "myOrders.html"));
})
router.get("/orders", (req, res) => {
    res.sendFile(path.join(staticPath, "orders.html"));
})

router.get('/products-api', adminController.getAllProducts);
router.get('/active-products-api', adminController.getActiveProducts);
router.get('/archive-products-api', adminController.getArchiveProducts);
router.get('/get-product/:prodId', adminController.getProduct);
router.put('/product-edit/:prodId', adminController.editProduct);
router.put('/active-archive/:prodId', adminController.archiveActiveProduct);
router.delete('/delete-product/:prodId', adminController.deleteProduct);

// File Upload
router.post("/add-product", adminController.addProduct);
router.post("/product-upload", upload.array('product-img', 3), adminController.addProductImages);

// Users
router.get('/users', (req, res) => {
    res.sendFile(path.join(staticPath, "adminUsers.html"));
});

export default router;