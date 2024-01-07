import { Request, Response, Router } from "express";
import { requestHasBody } from "../global/global-functions";
import { Credential, HttpResponse, HttpStatusCode } from "../../common";
import { userController } from "../controller/user.controller";

const authenticationRouter = Router({ mergeParams: true });

/**
* Route: api/v^/auth/login
* Type: POST
* Functionality: 
* Response type: JSON
*/
authenticationRouter.post("login", async function (req: Request, res: Response) {

});

/**
* Route: api/v^/auth/logout
* Type: POST
* Functionality: 
* Response type: JSON
*/
authenticationRouter.post("logout", async function (req: Request, res: Response) {

});

/**
* Route: api/v^/auth/signup
* Type: POST
* Functionality: 
* Response type: JSON
*/
authenticationRouter.post("signup", async function (req: Request, res: Response) {

    try {
        //request validation
        if (!requestHasBody(req)) {
            res.status(HttpStatusCode.BAD_REQUEST).send(`Invalid body supplied in the request.`);
        } else {
            const params = req.body as Credential;
            res.status(HttpStatusCode.OK).send(await userController.createCredential(params));
        }

    } catch (error: any) {
        return {
            code: HttpStatusCode.INTERNAL_SERVER_ERROR,
            success: false,
            error: error?.message
        } as HttpResponse;
    }

});

export default authenticationRouter;