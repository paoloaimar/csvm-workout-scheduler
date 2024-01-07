import { Router } from "express";
import credentialStatusRouter from "./credentialStatus.routes";


const router = Router();

router.use("/credentialStatus", credentialStatusRouter);

export default router;