import express from "express";
import { handleError } from "../utils/utils";
import { IEXService } from "@stock-bot/modules";

const router = express.Router();

/* GET home page. */
router.get("/:symbol", async function(req, res, next) {
  let symbol = req.params.symbol;
  let quote = await IEXService.getSymbolQuote(symbol, null);
  res.send({ price: quote });
});

router.use(handleError);

export default router;
