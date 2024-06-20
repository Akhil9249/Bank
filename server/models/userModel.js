const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    accountnumber: {
        type: Number
    },
    phonenumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    transaction : [{
        name: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        accountnumber: {
            type: Number,
        },
        status: {
            type: String,
        },
        amount: {
            type: Number,
        },
        balance: {
            type: Number,
        }
    }]
},{ timestamps: true });

module.exports = {
    Users: mongoose.model("Users", userSchema),
};
