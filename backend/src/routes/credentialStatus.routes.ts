import { Request, Response, Router } from "express";
import { credentialStatusController } from "../controller/credentialStatus.controller";
import { EntityPagination, EntitySort, Filter } from "../../common";

const credentialStatusRouter = Router({ mergeParams: true });

credentialStatusRouter.get("/", async function (req: Request, res: Response) {

    //get data of all areas defined
    let filters: Filter[] | undefined = undefined;
    let sorters: EntitySort[] | undefined = undefined;
    let pagination: EntityPagination | undefined = undefined;
    const includeDisabled = req.query.includeDisabled ? true : false;

    if (req.query.filters) {
        filters = JSON.parse(req.query.filters as string)
    }
    if (req.query.sorters) {
        sorters = JSON.parse(req.query.sorters as string)
    }
    if (req.query.pagination) {
        pagination = JSON.parse(req.query.pagination as string)
    }

    //get data of all credential status defined
    const resources = await credentialStatusController.findAll(filters, sorters, pagination, includeDisabled);
    res.send(resources);
})


export default credentialStatusRouter;