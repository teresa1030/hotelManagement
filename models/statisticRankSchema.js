/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

// 創數據類型

const statisticRankSchema = mongoose.Schema({
  time: String,
  data: []
}, {collection: 'statisticRank'})

const statistic = module.exports = mongoose.model('statisticRank', statisticRankSchema)
