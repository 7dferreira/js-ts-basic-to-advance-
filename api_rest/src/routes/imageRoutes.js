import { Router } from 'express';
import multer from 'multer';

import imageController from '../controllers/imageController';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig);

const router = new Router();

router.post('/', upload.single('images'), imageController.store);

export default router;
