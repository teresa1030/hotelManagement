/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

// 創數據類型

const statSchema = mongoose.Schema({
  data:{
    hotelName: String,
    travel_types:[],
    labels: {},
    reviews_num: Number,
    avg_rating: Number,
    countries_count: []
  },
  time: String
}, {collection: 'stat'})

const stat = module.exports = mongoose.model('stat', statSchema)
