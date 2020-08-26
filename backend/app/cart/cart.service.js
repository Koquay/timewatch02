require("./cart.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Cart = require("mongoose").model("Cart");

const { ObjectId } = mongoose.Types;

exports.deleteCartItem = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(402).send("No authorization token. Please log in.");
  }

  const { productId } = req.query;

  try {
    const { userId } = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Product",
    });

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Authorization failed. Please log in");
  }
};

exports.updateCart = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(402).send("No authorization token. Please log in.");
  }

  const { quantity, productId } = req.body;

  if (!("authorization" in req.headers)) {
    return res.status(402).send("No authorization token. Please log in.");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const cart = await Cart.findOne({ user: userId });

    const productExists = cart.products.some((doc) =>
      ObjectId(productId).equals(doc.product)
    );

    let updatedCart = await Cart.findOneAndUpdate(
      { _id: cart._id, "products.product": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Product",
    });

    return res.status(201).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Problem updating cart item. Please log in.");
  }

  res.json([]);
};

exports.addToCart = async (req, res) => {
  const { quantity, productId } = req.body;

  if (!("authorization" in req.headers)) {
    return res
      .status(402)
      .send("No authorization for this action. Please log in.");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const cart = await Cart.findOne({ user: userId });

    const productExists = cart.products.some((doc) =>
      ObjectId(productId).equals(doc.product)
    );

    let updatedCart;

    if (productExists) {
      updatedCart = await Cart.findOneAndUpdate(
        { _id: cart._id, "products.product": productId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      ).populate({
        path: "products.product",
        model: "Product",
      });
    } else {
      const newProduct = { product: productId, quantity };

      updatedCart = await Cart.findByIdAndUpdate(
        { _id: cart._id },
        { $addToSet: { products: newProduct } },
        { new: true }
      ).populate({
        path: "products.product",
        model: "Product",
      });
    }
    return res.status(201).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Problem adding item to cart");
  }
};
