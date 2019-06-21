import express from "express";
import { handleError } from "../utils/utils";
import { default as SymbolRouter } from "./Symbol";
import { default as OrderRouter } from "./Order";

const router = express.Router();

router.use("/symbol", SymbolRouter);
router.use("/order", OrderRouter);

router.use(handleError);

export default router;
