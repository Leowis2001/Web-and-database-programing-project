require('dotenv').config();
const express = require("express")
const app = express()
// const path = require("path")

app.use(express.json())

const userRoutes = require("./server/routes/user")
const workoutRoutes = require("./server/routes/workoutroutine")

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

// app.use(express.static(__dirname + "/public"))
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/login.html')))
app.use("/user", userRoutes)
app.use("/workoutroutine", workoutRoutes)

// instead of having a domain name like, www.bestrecipes.com, 
// we are using localhost:3000 (3000 is in our .env file which is not accessible.)

const PORT = process.env.PORT || 3500

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`))
