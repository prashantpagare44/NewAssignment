import express from 'express'
import {Register , Login , refreshToken } from '../controller/authController.js'

const router = express.Router()

router.post('/register', Register);
router.post('/login',Login);
router.post('/refresh-token',refreshToken);

export default router;

