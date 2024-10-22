import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';

const router = Router();

router.get('/:id', cartController.getCartItems);
router.put('/:id', cartController.updateCartItem);

export default router;
