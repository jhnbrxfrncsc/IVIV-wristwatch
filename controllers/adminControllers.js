import Product from '../models/Product.js';

let productId = '';

// Fetch all Products
export const getAllProducts = async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    if(products){
        res.json({bool: true, products});
    } else {
        res.json({bool: false});
    }
}

// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.prodId);
    if(product){
        res.json({bool: true, product});
    } else {
        res.json({bool: false});
    }
}

// ACTIVE PRODUCTS
export const getActiveProducts = async (req, res) => {
    const activeProducts = await Product.find({ isActive: true });
    if(activeProducts){
        res.json({bool: true, activeProducts});
    } else {
        res.json({bool: false});
    }
}

// ARCHIVE PRODUCTS
export const getArchiveProducts = async (req, res) => {
    const archiveProducts = await Product.find({ isActive: false });
    if(archiveProducts){
        res.json({bool: true, archiveProducts});
    } else {
        res.json({bool: false});
    }
}

// EDIT PRODUCT
export const editProduct = async (req, res) => {
    const result = await Product.findOne({productName: req.body.productName});
    const product = await Product.findById(req.params.prodId);
    productId = result._id;
    
    if(result && product.productName !== req.body.productName){
        res.json(
            {
                message: `Product Name: "${req.body.productName}" already exist"`,
                bool: false,
            }
        );
    } else if(result && product.productName === req.body.productName){
        const updatedProd = await Product.findByIdAndUpdate(req.params.prodId, req.body, {new: true})
        productId = req.params.prodId;
        res.json(
            {
                message: `Successfully updated to "${updatedProd.productName}"`,
                bool: true,
            }
        );
    } else {
        res.json({bool: false, message: `${req.params.prodId} does not exist!`});
    }
}

// Create Product
export const addProduct = async (req, res) => {
    const { productName } = req.body;
    const result = await Product.findOne({ productName: productName });
    if(result === null){
        const newProduct = new Product(req.body);
        newProduct.save((err, result) => {
            if(err) {
                return res.send(err);
            } else {
                productId = result._id;
                return res.json(
                    {
                        message: `new product: ${result.productName}`,
                        bool: true,
                        result 
                    }
                );
            }
        });
    } else {
        return res.status(404).json(
            {
                message: `Product already exist!`, 
                bool: false
            }
        );
    }
}

// ADD/EDIT PRODUCT IMAGE
export const addProductImages = async (req, res) => {
    const files = req.files.map(file => {
        return file.filename;
    })
    const result = await Product.findById(productId);
    if(result) {
        if(files.length >= 1 && files.length <=3){
            result.productImage = files;
            await Product.findByIdAndUpdate(productId, result, {new: true})
            res.redirect("/admin/products");
        } else {
            await Product.findByIdAndUpdate(productId, result, {new: true})
            res.redirect("/admin/products");
        }
    } else {
        console.log("Error")
    }
}

// ACTIVE/ARCHIVE A PRODUCT
export const archiveActiveProduct = async (req, res) => {
    const result = await Product.findById(req.params.prodId);
    if(result){
        result.isActive = !result.isActive;
        await Product.findByIdAndUpdate(req.params.prodId, result, {new: true});
        res.json(
            {
                message: `Product isActive property is now updated to ${result.isActive}`,
                bool: true,
            }
        )
    } else {
        res.json(
            {
                message: `Can't find the product`,
                bool: false,
            }
        )
    }
}

// DELETE A PRODUCT
export const deleteProduct = async (req, res) => {
    const result = await Product.findById(req.params.prodId);
    if(result !== null) {
        await Product.findByIdAndDelete(req.params.prodId);
        res.json(
            {
                message: `Deleted ${result.productName} product.`,
                bool: true,
            }
        )
    } else {
        res.json(
            {
                message: `Can't find the product`,
                bool: false,
            }
        )
    }
}