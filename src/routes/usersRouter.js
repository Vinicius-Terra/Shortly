import { signUp, signIn, getUserData } from '../controllers/usersController.js';
import { Router } from 'express';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/users/me', getUserData);

export default router;
