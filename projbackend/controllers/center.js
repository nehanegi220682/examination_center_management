const Center = require("../models/center");

exports.getCenterById = (req, res, next, id) => {

    Center.findById(id).exec((err, cent) => {
        if(err){
            return res.status(400).json({
                error: "Center not found in DB"
            }) 
        }
        req.center = cent;
        next();
    });
};



exports.createCenter = (req, res) => {
    const center = new Center(req.body);
    center.save((err, center) => {
        if(err){
            return res.status(400).json({
                error: "NOT able to save Center in DB"
            });
        }
        res.json({center});
    })
};




exports.getCenter = (req, res) => {
   return res.json(req.center);
};




exports.getAllCenters = (req, res) => {
    Center.find().exec((err, centers) => {
        if(err){
            return res.status(400).json({
                error: "No Center found"
            });
        } 
        res.json(centers);  
    })
}



exports.updateCenter = (req, res) => {
    
    const center = req.center;
    center.name = req.body.name;
    center.address = req.body.address;
    center.inCharge = req.body.inCharge;
    center.seats_available = req.body.seats_available;

    center.save((err, updatedCenter) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update center."
            });
        }  
        res.json(updatedCenter);
    });


}



exports.removeCenter = (req, res) => {
    const center = req.center;

    //remove is a mongoose operation
    center.remove((err, center) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete this center."
            });
        }
        res.json({
            message: `the center ${center} was Successfully deleted`
        });
    })
};


