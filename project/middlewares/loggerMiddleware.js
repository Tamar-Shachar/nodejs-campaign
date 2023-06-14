const logger = require('../logger/logger');

module.exports = function (msg) {//closure - in order to enable parameters to middleware
    return function (req, res, next) {
        logger.info(`${msg}: ${req.url}, time: ${new Date()} `);
        if (next) next();
    }
}