const express = require('express');

const app = express();

const port = 3000;


const admin = (req, res) => {
    return res.send("this is admin DASHBOARD");
};

const isAdmin = (req, res, next) => {
    console.log("isadmin is running");
    next();
    
}

const isloggedIn = (req, res, next) => {
    console.log("isloggedin is running");
    next();
}

app.get("/", (req, res)=>{
    return res.send("hello there");
});

app.get("/admin", isloggedIn, isAdmin, admin);

app.get("/signup", (req, res)=>{
    return res.send("hello there signup");
});

app.listen(port, () => {
    console.log("server is up an running..");
});