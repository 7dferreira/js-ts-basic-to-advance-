import multer from 'multer';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig).single('images');

class ImageController {
  async store(req, res) {
    return upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      return res.json(req.file);
    });
  }
}

export default new ImageController();
