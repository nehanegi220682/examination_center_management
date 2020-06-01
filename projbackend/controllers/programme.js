const Programme = require("../models/programme");

exports.getProgrammeById = (req, res, next, id) => {

    Programme.findById(id).exec((err, programme) => {
        if(err){
            return res.status(400).json({
                error: "Programme not found in DB"
            })
        }
        req.programme = programme;
        next();
    });
};


exports.createProgramme = (req, res) => {
    const programme = new Programme(req.body);
    
    programme.save((err, programme) => {
        if(err){
            return res.status(400).json({
                error: "NOT able to save programmes in DB"
            });
        }
        res.json({programme});
    })
};




exports.getProgramme = (req, res) => {
   return res.json(req.programme);
};




exports.getAllProgrammes = (req, res) => {
    console.log("inside GETALLPROGRAM");
    Programme.find().exec((err, programmes) => {
        if(err){
            return res.status(400).json({
                error: "No programme found"
            });
        } 
        res.json(programmes);  
    }) 
}



exports.updateProgramme = (req, res) => {
    
    const programme = req.programme;
    programme.programme_name = req.body.programme_name; 

    
    programme.save((err, updatedprogramme) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update programmes."
            });
        }  
        res.json(updatedprogramme);
    });


}



exports.removeProgramme = (req, res) => {
    const programme = req.programme;

    //remove is a mongoose operation
    programme.remove((err, programme) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete this programme."
            });
        }
        res.json({
            message: `the programme ${programme} was Successfully deleted`
        });
    })
};


