require("../user/user.model");
require("../cart/cart.model");

const User = require("mongoose").model("User");
const Cart = require("mongoose").model("Cart");
const isEmail = require("validator/lib/isEmail");
const isLength = require("validator/lib/isLength");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!isLength(password, { min: 6 })) {
      return res.status(422).send("Password must be at least 6 characters");
    } else if (!isEmail(email)) {
      return res.status(422).send("Invalid email");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).send("User does not exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Login information not valid.");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("token", token);

    const cart = await Cart.findOne({ user: user._id }).populate({
      path: "products.product",
      model: "Product",
    });
    console.log("cart", cart);

    res.status(200).json({ token, cart });
  } catch (error) {
    console.error(error);
    res.status(500).send("Problems login you in.");
  }
};
