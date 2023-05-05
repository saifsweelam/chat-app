const mongoose = require('mongoose');

const config = require('../config');

module.exports = async (action) => {
    try {
        await mongoose.connect(config.db.uri);
        let result = await action();
        await mongoose.disconnect();
        return result;
    } catch (e) {
        await mongoose.disconnect();
        throw new Error(e);
    }
}