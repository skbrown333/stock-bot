import express from "express";
import { handleError } from "../../utils/utils";
import SymbolController from "./SymbolController";
import { wrapAsync } from "../../utils/utils";
import { logRoutes } from "../../utils/logging";

const router = express.Router();

router.post("/purchased", wrapAsync(SymbolController.getPurchased));
router.get("/:symbol", wrapAsync(SymbolController.getPrice));
router.get("/:symbol/position", wrapAsync(SymbolController.getPosition));
router.get("/:symbol/quote", wrapAsync(SymbolController.getQuote));
router.post("/:symbol/historical", SymbolController.getHistorical);
router.post(
  "/:symbol/transaction",
  wrapAsync(SymbolController.symbolTransaction)
);

logRoutes("/symbol", router);
router.use(handleError);

export default router;
