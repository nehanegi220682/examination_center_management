const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken'); 
var expressJwt = require('express-jwt');

exports.signout = (req, res) => {
  //clear cookie whose name is token
    //we've access to this clearcookie bcz of cookie parser
    res.clearCookie("token");
    res.json({
        message: "User Signout successful"
    });
}

exports.signup = (req, res) => {

    //read docs about validationresult error
    //populate errors first
    console.log("inside backend authentication controller signup");
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg 
        });
    }




    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            console.log("ERR SAVING", err);
            return res.status(400).json({
                err: "NOT able to save user in DB",
                reason: err
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
}


exports.signin = (req, res) => {

    const errors = validationResult(req);
    const {email, password} = req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg 
        });
    }

        //findOne is a method of mongoose
    User.findOne({email}, (err, user) => {
        if (err || !user){
            //i.e if email is not found
            return res.status(400).json({
                error: "USER email does not exist"
            });
        }

     //if email is found we'll check if password is correct
        if(!user.authenticate(password)){
         return res.status(401).json({
         error: "EMAIL and PASSWORD donot match"
           
        });
    }
        //else signin the user(create a token put that token in cookies)
    //1.create token
    const token = jwt.sign({_id: user._id}, process.env.SECRET)
    //2.put token in cookie //create a cookie with name "token"
        res.cookie("token", token, {expire: new Date() + 9999});
 
    //3. send response to frontend 
        const {_id, name, email, role} = user;
        return res.json({ 
            token, user: {_id, name, email, role}
        })
     

    })
}


//protected routes
//this middleware(isSignedIn) add another property in request (userProperty), now we have req.auth property.
//to authenticate isSignedIn, we'll just check if user has this property
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET, //just any string
    userProperty: "auth"
});


//custom middlewares
//profile property is gonna be set from frontend only if the user in loggedin
//if re.profile, req.auth,is there and  req.profile_id ==req.auth._idthen checkeris true
//profile_id is set from frontend auth_id set by middleware
exports.isAuthenticated = (req, res, next) => {
   
    
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
   
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0)
        return res.status(403).json({
            error: "You are not ADMIN, Access Denied"
        });
    next();
}
 

