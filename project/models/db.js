const mongoose = require('mongoose');
const logger = require('../logger/logger');

const connect = () => {

    const url = process.env.DATABASE_URL;
    logger.info("process.env.DATABASE_URL :::" + url);

    mongoose.connect(url, {
        // useNewUrlParser: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
    })

    mongoose.connection.once("open", async () => {
        logger.info("Connected to database");
    });

    mongoose.connection.on("error", (err) => {
        logger.error("Error connecting to database  ", err);
    });
}

const disconnect = () => {

    if (!mongoose.connection) {
        return;
    }

    mongoose.disconnect();

    mongoose.once("close", async () => {
        console.log("Diconnected  to database");
    });

};

module.exports = {
    connect,
    disconnect
}