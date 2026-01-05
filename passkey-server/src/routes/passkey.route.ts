import express, { Router } from 'express';
import { startPasskeyRegistration } from '../controllers/passkey.controller';

const router: Router = express.Router();

router.get('/register/start', startPasskeyRegistration);

export default router;
