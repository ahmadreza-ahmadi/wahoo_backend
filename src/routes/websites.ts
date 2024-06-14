import { Router } from 'express';
import {
	createWebsite,
	deleteWebsite,
	getAllWebsites,
	getWebsite,
	updateWebsite,
} from '../controllers/websites';

const router = Router();

router.get('/read_all', getAllWebsites);

router.get('/read/:id', getWebsite);

router.post('/create', createWebsite);

router.put('/update/:id', updateWebsite);

router.delete('/delete/:id', deleteWebsite);

export default router;
