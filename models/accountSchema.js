const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test');
// mongoose.connect('mongodb://localhost/test', { useFindAndModify: false });
// 使用findOneAndRemove()及findOneAndUpdate()要避免使用useFindAndModify，因此設為false

// const db = mongoose.connection;
// db.once('error',() => console.log('Mongo connection error'));
// db.once('open',() => console.log('Mongo connection successed'));

const accountSchema = mongoose.Schema({
    // id: String,
    companyName: String,
    department: String,
    employeeNumber: String,
    employeeLimit: String,
    email: String,
    userName: String,
    password: String,
    lastLoginDate: String,
    lastLoginTime: String,
    firstLogin:Boolean,
    favorite: []
},{collection: 'accountData'})

const AccountData = module.exports = mongoose.model('accountData' , accountSchema);