import { Router } from 'express';
import { signUp, signIn, getUserData } from '../controllers/usersController.js';
import validateSignUp from "../middlewares/validateSignUp.js";
import validateSignIn from "../middlewares/validateSignIn.js";



const router = Router();

router.post('/signup', validateSignUp, signUp);
router.post('/signin', validateSignIn, signIn);
router.get('/users/me', getUserData);

export default router;
