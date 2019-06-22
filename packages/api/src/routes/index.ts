import express from "express";
import { handleError } from "../utils/utils";
import { default as SymbolRouter } from "./Symbol";
import { default as OrderRouter } from "./Order";
import { default as PositionRouter } from "./Position";

const router = express.Router();

router.use("/symbol", SymbolRouter);
router.use("/orders", OrderRouter);
router.use("/positions", PositionRouter);

router.use(handleError);

export default router;
