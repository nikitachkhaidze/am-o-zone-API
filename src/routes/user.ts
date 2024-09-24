import { Router } from 'express';
import { verifyAuthorization } from './verify-authorization';
import { userController } from '../controllers/user.controller';

const router = Router();

router.put('/:id', verifyAuthorization, userController.updateUser);

export default router;
