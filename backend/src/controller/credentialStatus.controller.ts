import { CredentialStatus, EntityPagination, EntitySort, Filter, HttpResponse, PaginationInfo } from "../../common";
import { logger } from "../services/logService";
import { db } from "../services/mssqlService";
import { BaseController } from "../types/baseController";

class CredentialStatusController extends BaseController {

    /**
     * Get all credential status defined
     */
    async findAll(filters?: Filter[] | undefined, sorters?: EntitySort[] | undefined, pagination?: EntityPagination, includeDisabled?: boolean): Promise<CredentialStatus[] | undefined> {
        try {

            //#region Statement Management

            let strFilters = "";
            /*
            if (filters) {
                strFilters += "AND " + db.getFilterStatement(filters, false);
            }

            let strOrders = "";
            if (sorters) {
                strOrders = db.getOrderStatement(sorters, true);
            }
            let strPagination = "";
            if (pagination) {
                strPagination = db.getPaginationStatement(pagination.resultPerPage, pagination.page);
            }
            */
            //#region

            const query: string = `SELECT 
                                        [PkId]
                                       ,[Code]
                                       ,[Description]
                                       ,[CreatedAt]
                                       ,[Updated_at]
                                   FROM [Csvm].[dbo].[CredentialStatus]
                                   ${strFilters};`;
            //get data from db
            const dbRes = await db.getData(query);
            if (!dbRes.success) {
                throw new Error(`DB exception - ${dbRes.error}`);
            }

            if (dbRes.rowNumber! > 0) {
                logger.debug(`${dbRes.rowNumber} credential status retrived.`)

                const ret: Array<CredentialStatus> = new Array<CredentialStatus>();
                dbRes.rows?.forEach((row: any) => {
                    ret.push({
                        PkId: row.PkId,
                        Code: row.Code,
                        Description: row.Code,
                        CreatedAt: row.CreatedAt,
                        UpdatedAt: row.UpdatedAt
                    });
                });

                return ret;
            } else {
                logger.debug(`Department findAll - No departments defined.`)
                return [];
            }

        } catch (error: any) {
            logger.error(`CredentialStatus controller findAll error: ${error.message}`)
            return [];
        }
    }

    findById(pkId: number) {
        throw new Error("Method not implemented.");
    }
    create(params: any): Promise<HttpResponse | undefined> {
        throw new Error("Method not implemented.");
    }
    update(params: any, pkId: number): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    remove(pkId: number): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    disable(pkId: number): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    disableMany(pkIds: number[]): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    createMany(params: any, clientId?: string | undefined): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    getRecordCount(resultPerPage: number, filterStatement?: string | undefined, includeDisabled?: boolean | undefined): Promise<PaginationInfo> {
        throw new Error("Method not implemented.");
    }

    /**
     * Return the current istance of the controller
     * @returns 
     */
    public static getIstance(): BaseController {
        if (!BaseController._istance) {
            BaseController._istance = new CredentialStatusController();
        }


        return BaseController._istance;
    }

}

export const credentialStatusController = CredentialStatusController.getIstance()