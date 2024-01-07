import { EntityPagination, EntitySort, Filter, HttpResponse, HttpStatusCode, PaginationInfo } from "../../common";

export abstract class BaseController {

    public static _istance: BaseController;

    /**
     * 
     */
    abstract findAll(filters?: Filter[] | undefined, sorters?: EntitySort[] | undefined, pagination?: EntityPagination, includeDisabled?: boolean): any
    abstract findById(pkId: number): any
    abstract create(params: any): Promise<HttpResponse | undefined>
    abstract update(params: any, pkId: number): Promise<HttpResponse>
    abstract remove(pkId: number): Promise<HttpResponse>
    abstract disable(pkId: number): Promise<HttpResponse>
    abstract disableMany(pkIds: number[]): Promise<HttpResponse>
    abstract createMany(params: any, clientId?: string): Promise<HttpResponse>
    abstract getRecordCount(resultPerPage: number, filterStatement?: string, includeDisabled?: boolean): Promise<PaginationInfo>


}