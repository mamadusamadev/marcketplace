import { Router } from 'express';
//import { upload } from '../middlewares/upload';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isSellerVerifiedOrAdmin } from '../middlewares/isSellerVerifiedOrAdmin';
import { ProductController } from '../controllers/product.controller';

import multer from 'multer';

const router = Router();
const upload = multer();



router.get('/fillter', ProductController.listAll);
router.get('/', isAuthenticated, isSellerVerifiedOrAdmin, ProductController.list);
router.get('/:id', isAuthenticated, ProductController.getById);

router.post(
    '/create',
    isAuthenticated,
    isSellerVerifiedOrAdmin,
    upload.array('images', 5),
    ProductController.create
  );
  router.patch(
    '/:id',
    isAuthenticated,
    isSellerVerifiedOrAdmin,
    upload.array('images', 5),
    ProductController.update
  );
  
router.delete('/:id', isAuthenticated, isSellerVerifiedOrAdmin, ProductController.delete);

export default router;
