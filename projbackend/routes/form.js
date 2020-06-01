var express = require('express')
var router = express.Router(); 
const {submitForm,getFormInfo} = require ("../controllers/form");
const { check, validationResult } = require('express-validator');
const {getUserById} = require("../controllers/user");


router.param("userId", getUserById );




router.post("/form/submitform/:userId", 
[
    check("email", "email is required ").isEmail()
   
]
, submitForm);


router.get("/form/getforminfo/:userId",
getFormInfo
);
 

module.exports = router;