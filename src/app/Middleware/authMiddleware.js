const jwt = require("jsonwebtoken");
const { accesToken } = require("../../config/service/accesToken");
// cho admin
const authMiddleWare = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(400).json("no token");
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, user) {
        try {
            // decode là cái cần giải mã
            if (err) {
                res.status(404).json({
                    message: "the authemtication",
                    status: "ERROR",
                });
            }
            if (user?.isAdmin) {
                next();
            } else {
                res.status(404).json({
                    message: "the authemtication",
                    status: "you cant do this action",
                });
            }
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    });
};
// cho user
const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token;
    const userParams = req.params.id;
    if (!token) {
        return res.status(400).json({ message: "no token" });
    }
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function (err, user) {
        try {
            // decode là cái cần giải mã
            if (err) {
                return res.status(404).json({
                    message: "the authemtication",
                    status: "ERROR",
                });
            }
            const { exp } = user; // Lấy thời gian hết hạn từ token
            const currentTime = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại (đơn vị giây)
            if (currentTime > exp) {
                return res.status(401).json({
                    message: "Token has expired",
                    status: "ERROR",
                });
            }
            if (user?.isAdmin || userParams === user?.id) {
                return next();
            } else {
                return res.status(404).json({
                    message: "the authemtication",
                    status: "you cant do this action",
                });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message, status: "404" });
        }
    });
};

const refreshToken = (req, res) => {
    console.log(req.headers.refresh);
    const token = req.headers.refresh;
    if (!token) {
        return res.status(400).json("no token");
    }
    jwt.verify(token, process.env.JWT_REFRESH_TOKEN, async function (err, user) {
        try {
            if (err) {
                return res.status(404).json({ message: "ERROR token" });
            }
            const { exp } = user; // Lấy thời gian hết hạn từ token
            const currentTime = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại (đơn vị giây)
            if (currentTime > exp) {
                return res.status(401).json({
                    message: "Token has expired",
                    status: "ERROR",
                });
            }
            if (user) {
                const acces_token = await accesToken({
                    id: user.id,
                    isAdmin: user.isAdmin,
                });
                return res.status(200).json({ acces_token });
            }
        } catch (error) {
            return res.status(400).json({ message: error, status: "404" });
        }
    });
};

module.exports = {
    authMiddleWare,
    authUserMiddleWare,
    refreshToken,
};
