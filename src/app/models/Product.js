const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete"); //  cho phép bạn thêm chức năng xóa mềm (soft delete) vào các bộ sưu tập của bạn.

const Product = new Schema(
    {
        name: { type: String, require: true },
        price: { type: String, require: true },
        image: { type: Array, required: true },
        type: { type: String, required: true },
        size: { type: Array, required: true },
        Ob: { type: String, required: true },
        sale: { type: Number, required: false, default: 1 },
        slug: { type: String, slug: "name", unique: true }, // tự động thêm slug lấy từ name, unique để check slug ko bị trùng
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);
Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all", //  ghi đè lên các phương thức như find(), findeOne(),...
});
module.exports = mongoose.model("Product", Product);
