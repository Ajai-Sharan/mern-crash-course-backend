import Product from "../model/product.model.js";
import mongoose from 'mongoose';

export const getProduct = async (req, res) => {
    try {
        // {} => fetch all the data in Product model
        const products = await Product.find({});

        res.status(200).json({ success: true, data: products });

    } catch (error) {
        console.error(`Error for fetching Products: ${error.message}`)
        res.status(400).json({ success: false, message: "server error" })
    }
}

export const createProduct = async (req, res) => {
    
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        console.error("Values not provided in all the fields");
        return res.status(401).json({success : false, message: "Please provide all the fields"})
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(200).json({success:true, data: newProduct})
    } catch (error) {
        console.error("Error in Create product:", error.message);
        return res.status(400).json({success:false, message: error.message})
    }
    
}

export const updatedProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message : "Product id not found"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success : true, data : updatedProduct});
    } catch (error) {
        console.error(`Error in updating product: ${error.message}`);
        res.status(500).json({success : false, message : "Server error"})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try{

        await Product.findByIdAndDelete(id);
        console.log(`Product with the id ${id} has been deleted successfully`);
        res.status(200).json({success : true, message : `Product has been deleted successfully`})  

    }
    catch(error){
        console.error("Error in Delete product:", error.message);
        return res.status(400).json({success:false, message: 'Product not found'})
    }

}
