import { Router } from 'express';
import websiteRoutes from './website';

const router = Router();

router.use('/website', websiteRoutes);

export default router;
