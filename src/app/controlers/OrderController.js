const order = require("../models/OrderProduct");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice, user } = req.body;
        if (!orderItems || !shippingAddress || !paymentMethod || !totalPrice || !user) {
            return res.status(400).json({ message: "missing someThing ?" });
        }
        for (const order of orderItems) {
            const getProduct = await Product.findOne({ _id: order.product });
            getProduct.sale += order.amount;
            await getProduct.save();
        }
        const newOrder = await new order({
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            user,
        });
        const orders = await newOrder.save();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};
const getAllOrder = async (req, res) => {
    try {
        const getAll = await order.find();
        return res.status(200).json(getAll);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};
const editOrder = async (req, res) => {};
const deleteOrder = async (req, res) => {};

module.exports = {
    createOrder,
    deleteOrder,
    editOrder,
    getAllOrder,
};
