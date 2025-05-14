import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import multer from 'multer';

const router = Router();
const upload = multer();

router.get('/me', isAuthenticated, UserController.getProfile);
router.patch('/me', isAuthenticated, UserController.updateProfile);
router.patch('/me/photo', isAuthenticated, upload.single('photo'), UserController.updateProfilePhoto);
router.patch('/me/password', isAuthenticated, UserController.updatePassword);
router.delete('/me', isAuthenticated, UserController.deleteAccount);
router.patch('/me/seller-mode', isAuthenticated, UserController.toggleSellerMode);

export default router;
