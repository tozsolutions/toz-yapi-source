import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validate } from '../middleware/validation';
import { loginSchema, registerSchema } from '../types/schemas';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export { router as authRoutes };