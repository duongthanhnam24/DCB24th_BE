const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete"); //  cho phép bạn thêm chức năng xóa mềm (soft delete) vào các bộ sưu tập của bạn.

const user = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        checkpassword: {
            type: String,
            required: true,
        },
        isAdmin: { type: Boolean, default: false, required: true },
        phoneNumber: { type: String, required: true },
        // access_token: { type: String, required: true },
        // refresh_token: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);
user.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all", //  ghi đè lên các phương thức như find(), findeOne(),...
});
module.exports = mongoose.model("user", user);
