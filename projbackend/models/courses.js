const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var courseSchema = new Schema({
    course_code: {
        type: String,
        required: true,
        maxlength: 32,
        
    }
       

  }, {timestamps: true});







  module.exports = mongoose.model("Course", courseSchema)
