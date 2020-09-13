/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

// 創數據類型

const statisticSchema = mongoose.Schema({
  time: String,
  labels: [],
  travel_types: [],
  avg_rating: Number,
  reviews_num: Number
}, {collection: 'statistic'})

const statistic = module.exports = mongoose.model('statistic', statisticSchema)
