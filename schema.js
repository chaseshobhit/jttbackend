const mongoose = require('mongoose');

//Defining a SCHEMA

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.']
    },
},{timestamps: true });

const User = mongoose.model('User',userSchema);

module.exports=User;