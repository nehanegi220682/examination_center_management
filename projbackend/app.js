require(`dotenv`).config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
//MIDDLEWARES
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");




//MY routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user"); 
const centerRoutes = require("./routes/center");
const courseRoutes = require("./routes/courses");
const programmeRoutes = require("./routes/programme");
const formRoutes = require("./routes/form");



//DB CONNECTION
mongoose.connect(process.env.DATABASE,{
useNewUrlParser: true,
 useUnifiedTopology: true,
useCreateIndex: true
})
.then(()=> {
    console.log("DB CONNECTED");
})
.catch( (err) =>{
    console.log("ERR CONNECTING TO DB");
    console.log(err);
}
);

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
 
//MY ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", centerRoutes);
app.use("/api", courseRoutes);
app.use("/api", programmeRoutes);
app.use("/api", formRoutes);

//port
 const port = process.env.PORT || 8000;
  
 //STARTING A SERVER
 app.listen(port, ()=> {
     console.log(`app is running at port ${port}`);
 })