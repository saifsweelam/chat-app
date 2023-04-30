const http = require('http');
const express = require('express');
const nunjucks = require('nunjucks');
const session = require('express-session');
const flash = require('connect-flash');

// Configuration
const config = require('./config');

// Routers
const authRouter = require('./routes/auth.route');
const profileRouter = require('./routes/profile.route');

// Initialize App and Web Server
const app = express();
const server = http.createServer(app);

// Template Engine
nunjucks.configure(config.views.dir, {
    express: app,
    autoescape: true
});
app.set('views', config.views.dir);
app.set('view engine', config.views.engine);

// Static Assets
app.use(express.static(config.static.dir));

// Handle Form Body
app.use(express.urlencoded({ extended: true }));

app.use(session(config.session));
app.use(({ session }, res, next) => {
    res.locals.session = session; // Make session accessible in templates
    next();
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
app.use('/', authRouter);
app.use('/profile', profileRouter);

// Run Server
server.listen(
    config.deploy.port,
    () => console.log(`Server running on port ${config.deploy.port}`)
)