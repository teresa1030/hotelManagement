var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)

var bodyParser = require('body-parser')

//comment
var path = require('path');
// var cookieParser = require('cookie-parser');
mongoose.connect('mongodb://myUserAdmin:b83m33pE@140.127.220.67:27017/HotelComments?authSource=admin')
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

const hoteltest = require('./router/hoteldata');


app.listen(3000,() => {
    console.log('app listening on port 3000.')
})

app.use('/api', hoteltest);

//comment
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
// app.use(cookieParser());
app.use(express.static('dist'))




module.exports = app;