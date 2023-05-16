const http = require('http');
const express = require('express');
const nunjucks = require('nunjucks');
const session = require('express-session');
const flash = require('connect-flash');
const { Server } = require('socket.io');

// Configuration
const config = require('./config');

// Routers
const indexRouter = require('./routes/index.route');
const authRouter = require('./routes/auth.route');
const profileRouter = require('./routes/profile.route');
const friendsRouter = require('./routes/friends.route');
const chatRouter = require('./routes/chat.route');

// Initialize App and Web Server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Track Online Users
const onlineUsers = {};

// Template Engine
nunjucks.configure(config.views.dir, {
    express: app,
    autoescape: true,
    noCache: true
});
app.set('views', config.views.dir);
app.set('view engine', config.views.engine);

// Static Assets
app.use(express.static(config.static.dir));

// Handle Form Body
app.use(express.urlencoded({ extended: true }));

// Session
const sessionMiddleware = session(config.session);
app.use(sessionMiddleware);
app.use(({ session }, res, next) => {
    res.locals.session = session; // Make session accessible in templates
    next();
});
io.engine.use(sessionMiddleware);
io.use((socket, next) => {
    let session = socket.request.session;
    if (session && session.user) {
        next();
    } else {
        next(new Error("Unauthorized"));
    }
})

// Flash Messages
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashed = {
        errors: req.flash('error'),
        warnings: req.flash('warning'),
        successes: req.flash('success'),
    };
    next();
});

// Use Routers
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/profile', profileRouter);
app.use('/friends', friendsRouter);
app.use('/chat', chatRouter);

// Socket Controllers
require('./sockets/online.socket')(io);
require('./sockets/friends.socket')(io);
require('./sockets/chat.socket')(io);

// Run Server
server.listen(
    config.deploy.port,
    () => console.log(`Server running on port ${config.deploy.port}`)
)