const Course = require("../models/courses");

exports.getCourseById = (req, res, next, id) => {

    Course.findById(id).exec((err, course) => {
        if(err){
            return res.status(400).json({
                error: "Courses not found in DB"
            })
        }
        req.course = course;
        next();
    });
};


exports.createCourse = (req, res) => {
    const course = new Course(req.body);
    course.save((err, course) => {
        if(err){
            return res.status(400).json({
                error: "NOT able to save courses in DB"
            });
        }
        res.json({course});
    })
};




exports.getCourse = (req, res) => {
   return res.json(req.course);
};




exports.getAllCourses = (req, res) => {
    Course.find().exec((err, courses) => {
        if(err){
            return res.status(400).json({
                error: "No course found"
            });
        } 
        res.json(courses);  
    })
}



exports.updateCourse = (req, res) => {
    
    const course = req.course;
    course.course_code = req.body.course_code;
    
    course.save((err, updatedcourse) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update courses."
            });
        }  
        res.json(updatedcourse);
    });


}



exports.removeCourse = (req, res) => {
    const course = req.course;

    //remove is a mongoose operation
    course.remove((err, course) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete this course."
            });
        }
        res.json({
            message: `the course ${course} was Successfully deleted`
        });
    })
};


