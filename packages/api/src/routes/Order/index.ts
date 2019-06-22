import express from "express";
import { handleError } from "../../utils/utils";
import OrderController from "./OrderController";
import { wrapAsync } from "../../utils/utils";
import { logRoutes } from "../../utils/logging";

const router = express.Router();

router.get("/", wrapAsync(OrderController.getOrders));
router.get("/:order", wrapAsync(OrderController.getOrder));

logRoutes("/orders", router);
router.use(handleError);

export default router;
