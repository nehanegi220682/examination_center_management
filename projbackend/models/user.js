const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    //todo for pasword
   encry_password: {
        type: String,
    },
    salt: String,

    role: {
        type: Number,
        default: 0
    },
    // enrollment_no: {
    //     type: String, 
        
    //    // unique: true,
    //     trim: true
    // },
    center_name: {
        type: String,
        maxlength: 50,
        trim: true
    },

  }, {timestamps: true});

  userSchema
    .virtual("password")
    .set( function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.getencryptedPassword(password);
    })
    .get(function(){
      return this._password;
    });

  userSchema.methods = {

    authenticate: function(plainpassword){
        return this.getencryptedPassword(plainpassword) === this.encry_password
    },
    
    getencryptedPassword: function(plainpassword){
          if (!plainpassword)
          return "";
        try{
             return crypto
            .createHmac("sha256", this.salt)
            .update(plainpassword)
            .digest("hex");
        }catch{
            return "";
        }
      }
  }

  module.exports = mongoose.model("User", userSchema)