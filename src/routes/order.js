const express = require("express");
const router = express.Router();
const OrderProduct = require("../app/controlers/OrderController");

router.delete("/destroy-order", OrderProduct.deleteOrder);
router.patch("/edit-order", OrderProduct.editOrder);
router.post("/create-order", OrderProduct.createOrder);
router.get("/get-order", OrderProduct.getAllOrder);

module.exports = router;
