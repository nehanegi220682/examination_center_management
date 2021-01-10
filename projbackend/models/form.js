const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var formSchema = new Schema({
    Fname: {
        type: String,
        // required: true,
        maxlength: 32,
        trim: true
    },
    Lname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        // required: true,
        // unique: true
    },
    address: {
        type: String,
        // required: true,
        maxlength: 100,
        trim: true
    },
    userId : {
        type: String,
       
    },

    phone_no: {
        type: Number,
        trim: true,
        // required: true,
    },

    programme: {
        type: String,
        // required: true,
    },

    courses: {
        type: String,
        // required: true
    },

    // enrollment_no: {
    //     type: String,
    //     // required: true,
    //     unique: true,
    //     trim: true
    // },
    center_name: {
        type: String,
        maxlength: 50,
        trim: true
    }, 

  }, {timestamps: true});







  module.exports = mongoose.model("Form", formSchema)
