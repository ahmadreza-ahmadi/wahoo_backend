import { Router } from 'express';
import websiteRoutes from './websites';

const router = Router();

router.use('/website', websiteRoutes);

export default router;
