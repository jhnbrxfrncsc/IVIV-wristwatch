import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from '../middlewares/upload.js';

import * as orderController from '../controllers/orderControllers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, ".." ,"public");
const router = express.Router();

router.use(express.static("public"));


router.get('/get-orders', orderController.getAllOrders);
router.post('/add-order', orderController.createOrder);
router.get('/:userId', orderController.getUserOrder);

export default router;