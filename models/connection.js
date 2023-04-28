const mongoose = require('mongoose');

const config = require('../config');

module.exports = (action) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.db.uri)
        .then(() => action())
        .then(result => {
            mongoose.disconnect();
            resolve(result);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    })
}