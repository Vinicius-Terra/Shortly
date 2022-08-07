import { urlShortener, GetUrlById, urlRedirector, deleteUrl } from '../controllers/urlsController.js';
import { Router } from 'express';

const router = Router();

router.post('/urls/shorten', urlShortener);
router.get('/urls/:id', GetUrlById);
router.get('/urls/open/:shortUrl', urlRedirector);
router.delete('/urls/:id', deleteUrl);

export default router;
