const USER = require("./user");
const PRODUCT = require("./product");
const REFRESH = require("./refreshToken");

function route(app) {
    //     // route (truyền vào 2 đối số 1 Path là tuyến đường 2 là function handler)
    // app.get('/', (req, res) => {
    //     res.render('home');
    //   }); // req(request chứa những thông tin gửi lên server) res(response là những phản hồi trả về mình có thể dùng nó để thực hiện các thao tác)
    app.use("/users", USER);
    app.use("/product", PRODUCT);
    app.use("/refresh", REFRESH);
}

module.exports = route;
