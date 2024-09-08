import {Router} from 'express';
import {productController} from "../controllers/products.controller";

const router = Router();

router.get(`/`, productController.getProducts);

router.get(`/categories`, productController.getCategories);

router.get(`/:id`, productController.getOneProduct);

export default router;
