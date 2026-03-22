import Order from "../models/ordersModel.js";
import Cart from "../models/cartModel.js";
import product from "../models/productsModel.js"; 

export const creatOrders = async (req, res, next) => {
  try {
    const { customerName, customerAddress } = req.body;
    const cartItems = await Cart.find().populate("item");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const cart of cartItems) {
      const prod = await product.findById(cart.item._id); 

      if (prod.stock < cart.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${prod.name}`,
        });
      }

      prod.stock -= cart.quantity;
      await prod.save();

      totalAmount += prod.price * cart.quantity;

      orderItems.push({
        product: prod._id,
        quantity: cart.quantity,
      });
    }

    const order = await Order.create({
      items: orderItems,
      totalAmount,
      customerName,
      customerAddress,
    });

    await Cart.deleteMany();

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};


export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("items.product");
    if (!orders) {
      const error = new Error("orders not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};


export const getOrdersById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      const error = new Error("order not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};


export const updateOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customerName, customerAddress } = req.body;
    const order = await Order.findByIdAndUpdate(
      id,
      {
        customerName,
        customerAddress,
      },
      { new: true }
    );
    if (!order) {
      const error = new Error("order not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrders = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      const error = new Error("order not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Order deleted successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
