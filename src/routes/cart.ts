import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { optionalAuth } from './optional-auth';

const router = Router();

router.get('/', optionalAuth, cartController.getCartItems);
router.put('/', optionalAuth, cartController.updateCartItem);

export default router;
