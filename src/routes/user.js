const express = require("express");
const router = express.Router();
const UserController = require("../app/controlers/UserController");
const { authMiddleWare, authUserMiddleWare } = require("../app/Middleware/authMiddleware");
router.delete("/move/trash/:id", authMiddleWare, UserController.moveUserToTrash); // xóa vào thùng rác
router.patch("/update/:id", authUserMiddleWare, UserController.UpdateUser); // cập nhật thông tin người dùng
router.post("/signup", UserController.createUser); // đăng ký
router.post("/login", UserController.SignIn); //đăng nhập
router.get("/all-user", authMiddleWare, UserController.getAllUser); // lấy tất cả tt người dùng
router.get("/profile/:id", authUserMiddleWare, UserController.getUser); // lấy ra 1 user

module.exports = router;
