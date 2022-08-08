import { Router } from 'express';
import { urlShortener, GetUrlById, urlRedirector, deleteUrl } from '../controllers/urlsController.js';
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.post('/urls/shorten', validateToken, urlShortener);
router.get('/urls/:id', GetUrlById);
router.get('/urls/open/:shortUrl', urlRedirector);
router.delete('/urls/:urlId',validateToken, deleteUrl);

export default router;
