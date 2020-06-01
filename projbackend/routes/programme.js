const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication");
const {getUserById} = require("../controllers/user");

const {
    getProgrammeById,
    getProgramme,
    createProgramme,
    updateProgramme,
    removeProgramme,
    getAllProgrammes
 
} = require("../controllers/programme");


//all of params
router.param("userId", getUserById);
router.param("programmeId", getProgrammeById); 

//actual routes

//create route
router.post("/programme/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProgramme
);


//read route
router.get("/programme/:programmeId", getProgramme);


//update route
router.put("/programme/:programmeId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
updateProgramme
);


//delete route
router.delete("/programme/:programmeId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
removeProgramme
);


//listing all programmes route
router.get("/programmes", getAllProgrammes);

module.exports = router;