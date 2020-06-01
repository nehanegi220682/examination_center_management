const User = require("../models/user");



exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                err: "No user was found on DB"
            })
        }
        req.profile = user
        next();
    }); 
};


exports.getUser = (req, res) => {
      
   //we set salt and pasword undefined in user's profile bcz we dont want to show them  to user
   req.profile.salt = undefined;
   req.profile.encry_password = undefined;
   
    return res.json(req.profile);
};



exports.updateUser = (req, res) => {
    User.findByIdAndUpdate( 
        {_id : req.profile._id},
        {$set : req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update this information."
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    );
};
