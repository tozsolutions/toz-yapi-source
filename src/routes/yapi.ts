import { Router } from 'express';
import { yapiController } from '../controllers/yapiController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { createYapiSourceSchema, updateYapiSourceSchema } from '../types/schemas';

const router = Router();

// Public routes
router.get('/sources', yapiController.getSources);
router.get('/sources/:id', yapiController.getSourceById);

// Protected routes
router.use(authenticate);
router.post('/sources', validate(createYapiSourceSchema), yapiController.createSource);
router.put('/sources/:id', validate(updateYapiSourceSchema), yapiController.updateSource);
router.delete('/sources/:id', yapiController.deleteSource);

export { router as yapiRoutes };