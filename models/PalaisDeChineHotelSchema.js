/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)

mongoose.Promise = global.Promise

// 創數據類型
// eslint-disable-next-line camelcase
const PalaisDeChineHotel = new Schema({
  id: String,
  rating: Number,
  superlative: String,
  times: {},
  text: String,
  locale: String,
  travel_type: String,
  room_type: String,
  website: String,
  approve_number: Number,
  labels: {},
  title: String,
  hotel_name: Number,
  response_body: Number
}, {collection: 'PalaisDeChineHotel'})

// AccountData與accountData.js相連
// accountData與accountData.js裡的./查詢路徑相連
module.exports = mongoose.model('PalaisDeChineHotel', PalaisDeChineHotel)
