/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

// 創數據類型
const companySchema = mongoose.Schema({
  company: String,
  area: String,
  commentNum: Number,
  rating: Number,
  companyID: String,
  favorite: Boolean
}, {collection: 'company'})

const company = module.exports = mongoose.model('company', companySchema)
