/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

// 創數據類型

const tagSchema = mongoose.Schema({
  tagID: String,
  tag: String
}, {collection: 'labelchoose'})

const labelchoose = module.exports = mongoose.model('labelchoose', tagSchema)

