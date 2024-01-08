import { EntityPagination, EntitySort, Filter, HttpResponse, HttpStatusCode, PaginationInfo } from "../../common";

export interface BaseController {

    findAll(filters?: Filter[] | undefined, sorters?: EntitySort[] | undefined, pagination?: EntityPagination, includeDisabled?: boolean): any
    findById(pkId: number): any
    create(params: any): Promise<HttpResponse | undefined>
    update(params: any, pkId: number): Promise<HttpResponse>
    remove(pkId: number): Promise<HttpResponse>
    disable(pkId: number): Promise<HttpResponse>
    disableMany(pkIds: number[]): Promise<HttpResponse>
    createMany(params: any, clientId?: string): Promise<HttpResponse>
    getRecordCount(resultPerPage: number, filterStatement?: string, includeDisabled?: boolean): Promise<PaginationInfo>


}