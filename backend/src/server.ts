
import { LogLevelDesc } from "loglevel";
import { db } from "./services/mssqlService";

//set the current working directory
process.chdir(__dirname);

import * as dotenv from 'dotenv';
import { logger } from "./services/logService";
dotenv.config();

const bodyParser = require('body-parser')
const express = require("express");

//const passport = require("passport");

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
import routes from './routes';
app.use('/api/v1', routes);
//#endregion

//Set Log level
const LogLevel = Object.keys(logger.Levels)[Object.values(logger.Levels).indexOf(process.env.LOG_LEVEL)] ?? 'WARN'
logger.setNewLevel(LogLevel as LogLevelDesc);

//Start the Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Express server listening on port ${port}...`);
    logger.info(`Endpoints available at http://localhost:${port}/api/v1`);
});