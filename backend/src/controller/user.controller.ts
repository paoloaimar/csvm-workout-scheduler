import { Filter, EntitySort, EntityPagination, HttpResponse, PaginationInfo, User, Credential, HttpStatusCode } from "../../common";
import { logger } from "../services/log.service";
import { BaseController } from "../types/baseController";

class UserController extends BaseController {
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
    public static getIstance(): BaseController {
        if (!BaseController._istance) {
            BaseController._istance = new UserController();
        }


        return BaseController._istance;
    }
}

export const userController = UserController.getIstance() as UserController;