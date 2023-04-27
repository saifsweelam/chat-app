const path = require('path');
const crypto = require('crypto');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const { diskStorage } = require('multer');

module.exports = new function() {
    this.deploy = {
        port: 3000
    }

    this.views = {
        engine: 'html',
        dir: path.join(__dirname, 'views')
    }

    this.static = {
        dir: path.join(__dirname, 'assets')
    }

    this.avatars = {
        dir: path.join(__dirname, 'assets', 'avatars')
    }

    this.upload = {
        storage: diskStorage({
            destination: (req, file, callback) => callback(null, this.avatars.dir),
            filename: (req, file, callback) => callback(null, `${Date.now()}-${file.originalname}`)
        })
    }

    this.db = {
        uri: process.env.SHOP_DB_URI || 'mongodb://127.0.0.1:27017/chat-app'
    }

    this.session = {
        secret: crypto.randomBytes(20).toString('hex'),
        saveUninitialized: false,
        resave: false,
        store: new SessionStore({
            uri: this.db.uri,
            collection: 'sessions'
        })
    }
}