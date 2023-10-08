const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const User = require("../models/userDataBase");
const { accesToken, refreshToken } = require("../../config/service/accesToken");

const createUser = async (req, res) => {
    try {
        const { name, email, password, checkpassword, phone } = req.body;
        var re = /\S+@\S+\.\S+/;
        let isEmail = re.test(email);
        // const allUser = await User.findOne({ email: req.body.email });
        if (!name || !email || !password || !checkpassword || !phone) {
            return res.status(400).json({ message: "Error, Something wrong" });
        }
        if (password !== checkpassword) {
            return res.status(400).json({ message: "Your password is not correct" });
        }
        // if (allUser) {
        //     return res.status(400).json("email error");
        // }
        if (!isEmail) {
            return res.status(400).json({ message: "Your Email is not correct" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const createUser = await new User({
            name,
            email,
            password: hash,
            checkpassword: hash,
            phoneNumber: phone,
        });
        const user = await createUser.save();
        return res.status(200).json(user);
    } catch (e) {
        return res.status(400).json({ message: e });
    }
};

const SignIn = async (req, res) => {
    try {
        const getUser = await User.findOne({ email: req.body.email });

        if (!getUser) {
            return res.status(400).json({ message: "email not found" });
        }

        const checkPassword = await bcrypt.compareSync(req.body.password, getUser.password);
        if (!checkPassword) {
            return res.status(400).json({ message: req.body.password });
        }

        if (getUser && checkPassword) {
            const accToken = await accesToken({
                id: getUser._id,
                isAdmin: getUser.isAdmin,
            });
            const refreshTok = await refreshToken({
                id: getUser._id,
                isAdmin: getUser.isAdmin,
            });

            const { password, checkpassword, ...others } = getUser._doc;
            return res.status(200).json({ ...others, accToken, refreshTok });
        }
    } catch (e) {
        return res.status(400).json({ message: e });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const getUser = await User.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).json({ message: "succesfull", getUser });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find();
        const user = await allUser.map((user) => user.toObject());
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

const moveUserToTrash = async (req, res) => {
    try {
        const user = await User.delete({ _id: req.params.id });
        const resultUser = res.status(200).json({ message: "successful" });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};
module.exports = {
    createUser,
    SignIn,
    UpdateUser,
    getAllUser,
    getUser,
    moveUserToTrash,
};
