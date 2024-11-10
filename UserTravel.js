// User.js
const mongoose = require('mongoose');

// Định nghĩa schema cho collection user
const userSchema = new mongoose.Schema({
  
    _id: { type: String, required: true }, // id phải là duy nhất
    username: { type: String, required: true }, // username phải là duy nhất
    email: { type: String, required: true }, // email phải là duy nhất
    password: { type: String, required: true } // password
});

// Tạo model từ schema
const User = mongoose.model('users', userSchema); // Tên model là 'user'

module.exports = User;