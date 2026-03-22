import product from "../models/productsModel.js";
import validProduct from "../middleware/productMiddleware.js";

export const getProducts = async (req, res) => {
  try {
    const productData = await product.find();
    if (!productData) {
      return res.status(404).json({ message: "no products found" });
    }
    return res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error has occured in the product controller", error);
  }
};

export const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const productData = await product.findById(id);
    if (!productData) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error has occured in the product controller", error);
  }
};

export const createProducts = async (req, res) => {
  try {
    const { error } = validProduct.validate(req.body);
    const { name, price, description, category, image, stock } = req.body;

    if (!name || !price || !description || !category || !image || !stock) {
      return res.status(400).json({
        message: "all fields are required",
        error: error.details[0].message
      });
    }
    const productData = new product({
      name,
      price,
      description,
      category,
      image,
      stock
    });
    if (price < 0) {
      return res.status(400).json({ message: "price cannot be negative" });
    }
    const productSavedData = await productData.save();

    return res.status(201).json({
      message: "product created successfully",
      data: productSavedData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error has occured in the product controller", error);
  }
};

export const updateProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validProduct.validate(req.body);
    const { name, price, description, category, image, stock } = req.body;
    if (!name || !price || !description || !category || !image || !stock) {
      return res.status(400).json({
        message: "all fields are required",
        error: error.details[0].message
      });
    }
    const productData = await product.findByIdAndUpdate(
      id,
      { name, price, description, category, image, stock },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "product updated successfully", data: productData });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error has occured in the product controller", error);
  }
};

export const deleteProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = await product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "deleted successfuly", data: productData });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error has occured in the product controller", error);
  }
};