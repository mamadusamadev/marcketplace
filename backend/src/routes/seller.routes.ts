import { Router } from 'express';
import { SellerController } from '../controllers/seller.controller';
import { ProductController } from '../controllers/product.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/isAdmin';
import { isSellerVerifiedOrAdmin } from '../middlewares/isSellerVerifiedOrAdmin';

import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/apply', isAuthenticated, upload.single('document'), SellerController.apply);
router.get('/pending', isAuthenticated, isAdmin, SellerController.listPending);
router.patch('/:id/verify', isAuthenticated, isAdmin, SellerController.verify);
router.get('/all', isAuthenticated, isAdmin, SellerController.listAdmin);
router.get('/:slug', SellerController.getBySlug);




export default router;
