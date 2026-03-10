
import express from 'express';
import { register } from '../controllers/authController.js'
import { login } from '../controllers/authController.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 * Returns: { token, user }
 */
router.post('/register', register);

    /* POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, user }
 */
router.post('/login', login);

export default router;