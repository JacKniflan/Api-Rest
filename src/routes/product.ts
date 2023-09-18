import { Router } from "express";
import { ProductController } from "../controller/ProductController";

const router = Router();
router.post('/', ProductController.new)
export default router;