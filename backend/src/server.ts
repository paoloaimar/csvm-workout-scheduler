//set the current working directory
process.chdir(__dirname);

import * as dotenv from 'dotenv';
import { logger } from "./services/log.service";
import { authenticationService } from './services/authentication.service';
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

if (process.env.AUTH_ENABLED == 'true') {
    app.use(authenticationService.Authenticator.initialize());
    app.use(authenticationService.Authenticator.session());

}

//#region Middleware

//#endregion


//#region Router Mounting
import routes from './routes';
app.use('/api/v1', routes);
//#endregion


//Start the Express Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Express server listening on port ${port}...`);
    logger.info(`Endpoints available at http://localhost:${port}/api/v1`);
});