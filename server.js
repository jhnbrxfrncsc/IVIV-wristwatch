import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, "public");
const app = express();
dotenv.config();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;
const DBURI = process.env.DBURI;

// DB Connection
mongoose.connect(DBURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then((req, res) => {
        console.log("DB Connected.");
        app.listen(PORT, () => {
            console.log(`server is listening on ${HOST}:${PORT}`);
        }); 
    })
    .catch(err => console.log(err.message));

// Middlewares
app.use(cors());
app.use(express.static(staticPath));
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }));



// API Routes
// Users
app.use('/', userRoutes);

// Admin Routes
app.use('/admin', adminRoutes);

// Orders
app.use('/orders', orderRoutes);

// Front-end Routes
// Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
});

// Signup
app.get('/signup', (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"));
});

// login
app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"));
});

// Profile
app.get('/profile', (req, res) => {
    res.sendFile(path.join(staticPath, "profile.html"));
});

// edit user
app.get("/user-edit", (req, res) => {
    res.sendFile(path.join(staticPath, "userEdit.html"));
})

// orders
app.get("/my-orders", (req, res) => {
    res.sendFile(path.join(staticPath, "my-orders.html"));
})

// Shop
app.get('/shop', (req, res) => {
    res.sendFile(path.join(staticPath, "shop.html"));
});

// Product
app.get('/product', (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"));
});

// Cart
app.get('/cart', (req, res) => {
    res.sendFile(path.join(staticPath, "cart.html"));
});

// 404
app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"));
});
app.use((req, res) => {
    res.redirect('/404');
});