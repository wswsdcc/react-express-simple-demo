var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// ****socket.io****
var http = require('http');
// ****socket.io****

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//****set webpack-dev-middleware****
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
//****set webpack-dev-middleware****


// ****socket.io****
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(8080);
io.sockets.on('connection',function(socket) {
    socket.on('addme', function(username) {
      console.log( username + ' is on deck');
      socket.username = username;
      socket.emit('chat', 'SERVER', 'You have connected');
      socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
    });
    socket.on('sendchat', function(data) {
      io.sockets.emit('chat', socket.username, data);
    });
    socket.on('disconnect', function() {
      io.sockets.emit('chat', 'SERVER', socket.username + ' has left the building');
    });
});
// ****socket.io****

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
