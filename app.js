var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var winston = require("./common/Logger/Logger").winston;


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//初始化AccessToken
var accessTokenController = require('./app_server/controllers/AccessTokenController');
accessTokenController.initAccessToken();

var routes = require('./app_server/routes/index');

var app = express();

var ua = require('express-ua');
app.use(ua);


// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partial');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./common/Logger/RequestLogger').create(winston));
app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;