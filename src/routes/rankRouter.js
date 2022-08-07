import { getRank } from '../controllers/rankController.js';
import { Router } from 'express';

const router = Router();

router.get('/ranking', getRank);

export default router;
