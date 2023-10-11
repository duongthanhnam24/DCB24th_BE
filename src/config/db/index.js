const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connect() {
    console.log(process.env.MONGODB_URL);
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const database = mongoose.connection.db;
        console.log("connect successfully");
    } catch (error) {
        console.log({
            message: "connect failed",
            error: error,
        });
    }
}

module.exports = { connect };
