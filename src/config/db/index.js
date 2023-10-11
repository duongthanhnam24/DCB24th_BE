const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const database = mongoose.connection.db;
        console.log("connect successfully");
    } catch (error) {
        console.log("connect failed");
    }
}

module.exports = { connect };
