import { Filter, EntitySort, EntityPagination, HttpResponse, PaginationInfo, User, Credential, HttpStatusCode } from "../../common";
import { logger } from "../services/log.service";
import { SqlParameter, db } from "../services/mssql.service";
import { BaseController } from "../types/baseController";
import uniqid from 'uniqid';
import sql from 'mssql';
import { encrypt } from './../helper/auth.helper'

class UserController implements BaseController {

    private static _istance: UserController;

    async findAll(filters?: Filter[] | undefined, sorters?: EntitySort[] | undefined, pagination?: EntityPagination | undefined, includeDisabled?: boolean | undefined): Promise<User[] | undefined> {
        throw new Error("Method not implemented.");
    }
    async findById(pkId: number): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }

    async findByUsername(username: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }

    /**
     * Perform the creation of a new user on the master data
     * @param params 
     */
    async create(params: User): Promise<HttpResponse | undefined> {
        try {

        } catch (error: any) {
            logger.error(`User controller Error creating user - ${error.message}`);
            return { code: HttpStatusCode.INTERNAL_SERVER_ERROR, success: false, error: error.message };
        }
    }

    /**
     * Perform the creation of a new user's credential on the master data
     * @param params 
     * @returns 
     */
    async createCredential(params: Credential): Promise<HttpResponse | undefined> {
        try {

            logger.debug(`Request the creation of a new user credential. Username: ${params.Username ?? params.Email}`);

            //get a new unique verification code
            params.VerificationCode = uniqid();

            //hash the clear input password
            params.HashPwd = encrypt(params.ClearPwd!, process.env.SECRET_KEY!)

            const dbRes = await db.executeStoredProcedure('spCreateCredential', [
                new SqlParameter("FirstName", params.User.FirstName, sql.NVarChar(100)),
                new SqlParameter("LastName", params.User.LastName, sql.NVarChar(100)),
                new SqlParameter("LoginName", params.User.LoginName ?? "", sql.NVarChar(100)),
                new SqlParameter("Username", params.Username, sql.NVarChar(100)),
                new SqlParameter("Email", params.Email, sql.NVarChar(100)),
                new SqlParameter("HashPwd", params.HashPwd, sql.NVarChar(200)),
                new SqlParameter("VerificationCode", params.VerificationCode, sql.NVarChar(200))
            ]);
            if (dbRes.success) {
                //user's credential creation OK on db => send user verification email

                return { success: true, code: HttpStatusCode.OK };
            } else {
                return { success: false, code: HttpStatusCode.INTERNAL_SERVER_ERROR, error: `Error inserting user's credential on db - ${dbRes.error}` };
            }


        } catch (error: any) {
            logger.error(`User controller Error creating credential - ${error.message}`);
            return { code: HttpStatusCode.INTERNAL_SERVER_ERROR, success: false, error: error.message };
        }
    }

    async update(params: any, pkId: number): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    async remove(pkId: number): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    async disable(pkId: number): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    async disableMany(pkIds: number[]): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    async createMany(params: any, clientId?: string | undefined): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    async getRecordCount(resultPerPage: number, filterStatement?: string | undefined, includeDisabled?: boolean | undefined): Promise<PaginationInfo> {
        throw new Error("Method not implemented.");
    }

    /**
     * Return the current istance of the controller
     * @returns 
     */
    public static getIstance(): UserController {
        if (!UserController._istance) {
            UserController._istance = new UserController();
        }


        return UserController._istance;
    }
}

export const userController = UserController.getIstance();