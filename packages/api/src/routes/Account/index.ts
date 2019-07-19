import express from "express";
import { handleError } from "../../utils/utils";
import AccountController from "./AccountController";
import { wrapAsync } from "../../utils/utils";
import { logRoutes } from "../../utils/logging";

const router = express.Router();

router.get("/", wrapAsync(AccountController.getAccount));

logRoutes("/account", router);
router.use(handleError);

export default router;
