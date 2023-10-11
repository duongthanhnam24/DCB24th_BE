const path = require("path"); // để sử dụng module `path`. Module `path` cung cấp các phương thức để làm việc với đường dẫn tập tin và thư mục.
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const methodOverride = require("method-override");
const app = express();
const port = 4000;
const route = require("./routes/index.js");
const db = require("./config/db/index.js");

// const corsOption = {
//     credentials: true,
//     origin: ["http://yourdomain.com", "http://localhost:3000", "http://127.0.0.1:5500"],
// };
// connect to DB
db.connect();
app.use(cors());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false })); //giải mã các dữ liệu được gửi từ client-side bằng phương thức POST và PUT
// - dễ hiểu là bắt được dữ liệu submit từ form lên cấu trúc lại dữ liệu và lưu vào object là body

app.use(express.json()); //giải mã các dữ liệu được gửi đến server-side dưới dạng JSON.
//Với dòng lệnh này, server-side sẽ tự động phân tích các dữ liệu từ JSON về đối tượng JavaScript.

app.use(methodOverride("_method")); //là một middleware trong Express để ghi đè phương thức HTTP(PUT,PATCH,...) cho các yêu cầu gửi từ client lên server.

// HTTP logger
app.use(morgan("combined"));

// Middleware

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//Windows Shift + Alt + F.
