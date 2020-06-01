const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/authentication");
const {getUserById} = require("../controllers/user");

const {
    getCourseById,
    getCourse,
    createCourse,
    updateCourse,
    removeCourse,
    getAllCourses

} = require("../controllers/courses");


//all of params
router.param("userId", getUserById);
router.param("courseId", getCourseById);

//actual routes

//create route
router.post("/course/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCourse
);


//read route
router.get("/course/:courseId", getCourse);


//update route
router.put("/course/:courseId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
updateCourse
);


//delete route
router.delete("/course/:courseId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
removeCourse
);


//listing all courses route
router.get("/courses", getAllCourses);

module.exports = router;