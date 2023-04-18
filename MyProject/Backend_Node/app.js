require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var productsRouter = require('./routes/products');
var cors = require('cors')
var app = express();

// var mongoose = require('mongoose');
var Product = require('./models/products')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false , limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors())



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter)
app.use('/products', productsRouter)

// const mongo_url = "mongodb+srv://boykingkao:1020304050@cluster0.uz8bm14.mongodb.net/test"
// mongoose.set('strictQuery', true)

// mongoose.connect(process.env.MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...',err));



// add data to mongodb
// const product = new Product({
//   name: "test",
//   price: 100,
//   img: "test",
//   owner: "test"
// });
// product.save();
// console.log("add product")

app.get('/add', function (req, res, next) {

  const product = new Product({
    name: "test",
    price: 100,
    img: "test",
    owner: "test"
  });

  // mongoose change database
  
  product.save();
  console.log("add product")
  console.log(process.env.MONGODB_URI)
  
})


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
