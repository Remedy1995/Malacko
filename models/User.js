const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },

    phone: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String
    },
    createdAt: {
        type: Date, default: Date.now()
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;