import { Router } from 'express';
import alunoController from '../controllers/alunoController';

const router = new Router();

router.get('/', alunoController.index);

export default router;
