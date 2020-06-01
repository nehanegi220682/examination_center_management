const Form = require("../models/form");

exports.submitForm = (req, res) => {
    console.log("inside controllers form");
    console.log("REQ BODY IS", req.body);
    const form = new Form(req.body);
    console.log("inside controller for db is", form);
    form.save((err, form) => {
        if(err){
            return res.status(400).json({
                error: "NOT able to save form in DB",
                reason: err
            });
        }
        console.log("form submitted inside submit form returning response form")
        res.json({form}); 
    })

}




exports.getFormInfo = (req, res) => {
    console.log("inside form info function");
    

    console.log(req.params);
   
    

    Form.findOne({userId : req.params.userId}).exec((err, form) => {
            if(err){
                return res.status(400).json({
                    error: "No form found"
                });
            } 
            res.json(form);  
        })
}




