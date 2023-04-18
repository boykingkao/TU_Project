"netlify severless function"
exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ msg: "Hello, World!" })
    };
    }
// Path: Backend_Node\functions\test.js
// Compare this snippet from Backend_Node\app.js:
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var aboutRouter = require('./routes/about');
// var productsRouter = require('./routes/products');
// var cors = require('cors')
// var app = express();
//
// var mongoose = require('mongoose');
//
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
//
//
// const ngrok_url = "https://9867-2001-fb1-61-7ead-4b78-ead1-6062-4dd5.ap.ngrok.io"
//
// app.use(cors())
//
//
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/about',aboutRouter)
// app.use('/products',productsRouter)

