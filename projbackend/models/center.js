const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');


var centerSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
        trim: true
    },
    address: {
        type: String,
        maxlength: 80,
        required: true,
    },
    inCharge: {
        type: String,
        maxlength: 50,
        required: true,
        
    },
    seats_available: {
        type: Number,
        required: true
    }
});

//todo1: design areseats available function
//todo2: if center is alotted decrease it

// centerSchema.methods = {
    
//     allotCenter: function(center_name){
//         if(findCenter(center_name).seats_available >= 1)
//         {
//             //alot the center
//         }
//         else
//         {
//             //toast for choosing another center
//             console.log("no seats in this center");
//         }
//     },


//     findCenter: function(center_name){
//         //loop through all center and return the center if name matches

//     }

// }



module.exports = mongoose.model("Center",centerSchema);