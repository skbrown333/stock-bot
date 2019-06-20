import express from "express";
import { handleError } from "../utils/utils";
import SymbolController from "./Symbol/SymbolController";
import { wrapAsync } from "../utils/utils";
import { logRoutes } from "../utils/logging";

const router = express.Router();

/* GET home page. */
router.get("/order/:order", wrapAsync(SymbolController.getOrder));

router.post("/purchased", wrapAsync(SymbolController.getPurchased));
router.get("/:symbol", wrapAsync(SymbolController.getPrice));
router.get("/:symbol/position", wrapAsync(SymbolController.getPosition));
router.get("/:symbol/quote", wrapAsync(SymbolController.getQuote));
router.post("/:symbol/historical", SymbolController.getHistorical);
router.post("/:symbol/purchase", wrapAsync(SymbolController.purchaseSymbol));
router.post("/:symbol/sell", wrapAsync(SymbolController.sellSymbol));

logRoutes("/symbol", router);
router.use(handleError);

export default router;
