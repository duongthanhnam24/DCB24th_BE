const Product = require("../models/Product");
const escapeStringRegexp = require("escape-string-regexp-node");

// CRUD
const createProduct = async (req, res) => {
    try {
        const { name, price, image, type, size, Ob } = req.body;
        if (
            !name ||
            !price ||
            !image ||
            image.lenght < 3 ||
            !type ||
            !size ||
            size.lenght < 1 ||
            !Ob
        ) {
            return res.status(400).json({ message: "missing something ?" });
        }

        const newProduct = await new Product({
            name,
            price,
            image,
            type,
            size,
            Ob,
        });
        const product = await newProduct.save();
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

const getAllProduct = async (req, res) => {
    const pageIndex = req.query.page;
    const page = +pageIndex + 1;
    try {
        const countProducts = await Product.count();
        const Products = await Product.find()
            .limit(10)
            .skip(pageIndex * 10);
        const totalPage = Math.ceil(countProducts / 10);
        // const product = Products.map((product) => product.toObject());
        return res.status(200).json({ page, countProducts, totalPage, Products });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

const getHotProduct = async (req, res) => {
    const newProduct = req.query.sort;
    try {
        if (newProduct) {
            const Products = await Product.find().limit(8).sort({
                updatedAt: newProduct,
            });
            return res.status(200).json(Products);
        }
        const Products = await Product.find({ sale: { $gte: 5 } }).limit(10);
        return res.status(200).json(Products);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

const getProduct = async (req, res) => {
    try {
        const productItem = await Product.findOne({ _id: req.params.id });
        return res.status(200).json(productItem);
    } catch (error) {
        return res.status(400).json({ message: error, status: 400 });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, price, image, type, size, Ob } = req.body;
        if (!name || !price || !image || image.lenght >= 3 || !type || !size || !Ob) {
            return res.status(400).json({ message: "missing something ?" });
        }
        const product = await Product.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).json({ message: "suscces" });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.delete({ _id: req.params.id });
        return res.status(200).json({ message: "suscces" });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

const deleteManyProduct = async (req, res) => {
    try {
        await Product.delete({ _id: { $in: req.body } });
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// panigated
const PanigatedSearch = async (req, res) => {
    try {
        const filter = req.query.filter;
        const limit = 4;
        const pageIndex = 0;
        const productLength = await Product.count();
        const $regex = escapeStringRegexp(filter);
        const Products = await Product.find({ name: { $regex } })
            .limit(limit)
            .skip(pageIndex * limit);
        const pages = Number(pageIndex + 1);
        const totalPage = Math.ceil(productLength / limit);

        // const product = Products.map((product) => product.toObject());
        return res.status(200).json({ productLength, pages, totalPage, Products });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

const getObjectProduct = async (req, res) => {
    try {
        const { sort, page } = req.query;
        const param = req.params.ob;
        const paramtype = req.query.type;
        const totalOb = await Product.count({ Ob: param });
        const limit = 9;
        const pages = Number(page) + 1;
        const totalPage = Math.ceil(totalOb / limit);
        if (param !== "man" && param !== "woman" && param !== "kids") {
            return res.status(400).json({ message: "sorry we dont found this page" });
        }
        if (!page) {
            return res.status(400).json("No page numbers found");
        }

        if (paramtype) {
            const totalOb = await Product.count({ Ob: param, type: paramtype });
            const totalPage = Math.ceil(totalOb / limit);
            if (sort) {
                const Products = await Product.find({ Ob: param, type: paramtype })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({
                        [sort[1]]: sort[0],
                    });
                return res.status(200).json({ totalOb, pages, totalPage, Products });
            }

            const Products = await Product.find({ Ob: param, type: paramtype })
                .limit(limit)
                .skip(page * limit);
            return res.status(200).json({ totalOb, pages, totalPage, Products });
        }

        if (sort) {
            const Products = await Product.find({ Ob: param })
                .limit(limit)
                .skip(page * limit)
                .sort({
                    [sort[1]]: sort[0],
                });
            return res.status(200).json({ totalOb, pages, totalPage, page, Products });
        }
        const Products = await Product.find({ Ob: param })
            .limit(limit)
            .skip(page * limit);

        return res.status(200).json({ totalOb, pages, totalPage, page, Products });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

module.exports = {
    createProduct,
    getAllProduct,
    getHotProduct,
    getProduct,
    updateProduct,
    PanigatedSearch,
    getObjectProduct,
    deleteProduct,
    deleteManyProduct,
};
