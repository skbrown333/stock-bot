import express from "express";
import { handleError } from "../../utils/utils";
import PositionController from "./PositionController";
import { wrapAsync } from "../../utils/utils";
import { logRoutes } from "../../utils/logging";

const router = express.Router();

router.get("/", wrapAsync(PositionController.getPositions));

logRoutes("/positions", router);
router.use(handleError);

export default router;
