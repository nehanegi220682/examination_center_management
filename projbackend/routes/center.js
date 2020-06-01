const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication");
const {getUserById} = require("../controllers/user");

const {
    getCenterById,
    getCenter,
    createCenter,
    updateCenter,
    removeCenter,
    getAllCenters

} = require("../controllers/center");


//all of params
router.param("userId", getUserById);
router.param("centerId", getCenterById);

//actual routes

//create route
router.post("/center/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCenter
);


//read route
router.get("/center/:centerId", getCenter);


//update route
router.put("/center/:centerId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
updateCenter
);


//delete route
router.delete("/center/:centerId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
removeCenter
);


//listing all centers route
router.get("/centers", getAllCenters);

module.exports = router;