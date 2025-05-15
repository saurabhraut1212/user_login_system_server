import express from 'express';
import { register, login } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';
import { loginSchema, registerSchema } from '../validations/authValidation';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

export default router;
