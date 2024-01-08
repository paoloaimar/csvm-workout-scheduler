import passport, { PassportStatic } from "passport";
import passportLocal, { IVerifyOptions, VerifyFunction } from "passport-local";
import { logger } from "./log.service";
import { userController } from "../controller/user.controller";
import { Credential, User, UserStatuses } from "../../common";
import { credentialController } from "../controller/credential.controller";
import { passwordIsValid } from './../helper/auth.helper';

type PassportDoneFunction = (error: any, user?: Express.User | false, options?: IVerifyOptions) => void;

class AuthenticationService {

    private static instance: AuthenticationService;
    public Authenticator: PassportStatic;

    constructor() {

        this.Authenticator = passport;
    }

    /**
     * Initialize the authentication service based on Passport library
     */
    public init(): void {
        try {
            this.Authenticator.use("local-login", new passportLocal.Strategy(this._verifyUser));
            this.Authenticator.serializeUser(this._serializeUser);
            this.Authenticator.deserializeUser(this._deserializeUser);
        } catch (error: any) {
            logger.error(`Error on Authentication Service Initialization - ${error.message}`);
        }
    }

    /**
     * Verify a new logged user
     * @param username 
     * @param password 
     * @param done 
     */
    private async _verifyUser(username: string, password: string, done: PassportDoneFunction): Promise<void> {
        try {


            logger.trace(`Auth Service Verify user with username: '${username}' and password '${password}'`);

            const user = await userController.findByUsername(username);
            if (!user) {
                //no user found on db with the specified username
                logger.debug(`Authentication Service VerifyUser error - Incorrect username ${username}`);
                return done(null, false, { message: `Incorrect username ${username}` });
            }

            if (user.Status.Code != UserStatuses.Active) {
                //user not active
                logger.debug(`Authentication Service VerifyUser error - User ${username} not Active. Current status: ${user.Status.Code}`);
                return done(null, false, { message: `User ${username} not Active. Current status: ${user.Status.Code}` });
            }

            //get user credential
            const credentials = await credentialController.findByUsername(username);
            if (!credentials) {
                //no credentials found on db for the user
                logger.debug(`Authentication Service VerifyUser error - No credentials stored for user ${username}`);
                return done(null, false, { message: `No credentials found for user ${username}` });
            }
            //check the input password
            const pwdValid = passwordIsValid(password, credentials!);
            if (!pwdValid) {
                //password inserted not match with the stroed ones
                logger.debug(`Authentication Service VerifyUser error - Incorrect password`);
                return done(null, false, { message: `Incorrect password` });
            }

            return done(null, { user: user, error: null }, { message: `User ${username} logged in` });

        } catch (error: any) {
            logger.error(`Authentication Service Error verifying user - ${error.message}`);
            return done(error);
        }
    }

    /**
     * Serialize user's information into cookie session
     * @param user 
     * @param done 
     */
    private _serializeUser(user: Express.User, done: PassportDoneFunction): void {
        done(undefined, user);
    }

    /**
     * Deserialize user's information from cookie session
     * @param user 
     * @param done 
     * @returns 
     */
    private async _deserializeUser(user: Express.User, done: PassportDoneFunction): Promise<void> {
        try {
            const cookieCredential = user as Credential;

            if (!cookieCredential.Username) {
                throw new Error("No username found on cookie session");
            }

            const credential = await credentialController.findByUsername(cookieCredential.Username);
            if (!credential) {
                //credential not found for the user
                throw new Error(`No credential found for user ${cookieCredential.Username}`);
            }

            return done(null, { user: user, error: null });

        } catch (error: any) {
            logger.error(`Authentication Service Error deserializing user - ${error.message}`);
            return done(error);
        }
    }

    public static getInstance(): AuthenticationService {
        if (!AuthenticationService.instance) {
            AuthenticationService.instance = new AuthenticationService();
        }

        return AuthenticationService.instance;
    }
}

export const authenticationService = AuthenticationService.getInstance();