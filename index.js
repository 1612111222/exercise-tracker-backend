require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db")
const registerRoute = require("./Route/registerRoute");
const loginRoute = require('./Route/loginRoute')

// database connection
db();
// middlewares
app.use(express.json());
app.use(cors());
// routes
app.use("/api/registerRoute", registerRoute);
app.use("/api/loginRoute", loginRoute)

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Listining on port http//:localhost:${port}`)
})