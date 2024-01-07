import { Request, Response, Router } from "express";
import { credentialController } from "../controller/credential.controller";
import { EntityPagination, EntitySort, Filter } from "../../common";

const userRouter = Router({ mergeParams: true });

/**
* Route: api/v^/user/statuses
* Type: GET
* Functionality: 
* Response type: JSON
*/
userRouter.get("/statuses", async function (req: Request, res: Response) {

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
    const resources = await credentialController.findAllStatuses(filters, sorters, pagination, includeDisabled);
    res.send(resources);
})


export default userRouter;