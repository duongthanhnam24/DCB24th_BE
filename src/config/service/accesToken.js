var jwt = require("jsonwebtoken");

async function accesToken(payload) {
    const acc = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "30s",
    });
    return acc;
}

async function refreshToken(payload) {
    const re = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "365d",
    });
    return re;
}
module.exports = {
    accesToken,
    refreshToken,
};
