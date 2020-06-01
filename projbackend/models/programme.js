const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var programmeSchema = new Schema({
   programme_name: {
        type: String,
        required: true,
        maxlength: 32,
        
    }  

  }, {timestamps: true});

  module.exports = mongoose.model("Programme", programmeSchema)
