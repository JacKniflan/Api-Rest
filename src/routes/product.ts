import { Router } from "express";
import { ProductController } from "../controller/ProductController";

//Se crea la constante router para las rutas de los productos y se inicializa el router con los metodos new, getAll, getById, delete, update
const router = Router();
router.post("/", ProductController.new);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.delete("/:id", ProductController.delete);
router.patch("/:id", ProductController.update);
export default router;
