const bodyParser = require('body-parser')
const express = require("express");
const passport = require("passport");

//Initialization of web server over express
const app = express();
//Initialization of the web socket server
const ws = require("express-ws")(app);

// Support body on post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//#region Middleware

//#endregion

//#region Router Mounting

//#endregion

//Start the Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express server listening on port ${port}...`);

});