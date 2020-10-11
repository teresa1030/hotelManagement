const mongoose = require('mongoose');


const historyDataSchema = mongoose.Schema({

    condition:[],
    reply:[],
    tags:[],
    favorite:[],
    login:[],
    logout:[],
    user:[],
    userDetailModify:[],
    UserListModify:[]   

},{collection: 'history'})

const historyData = module.exports = mongoose.model('history' , historyDataSchema);