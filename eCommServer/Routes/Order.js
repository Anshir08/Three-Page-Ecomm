import { Router } from "express";
import { createOrder, getOrder } from "../Controllers/Order.js";

const router = Router();

router.post("/", createOrder);
router.get("/:productId", getOrder);

export default router;