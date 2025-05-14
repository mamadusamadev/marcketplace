import { Router } from 'express';
import { ShippingController } from '../controllers/shipping.controller';
import { CategoryController } from '../controllers/category.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAdmin } from '../middlewares/isAdmin';


const router = Router();

router.post('/shipping-zones', isAuthenticated, isAdmin, ShippingController.create);
router.get('/shipping-zones', isAuthenticated, isAdmin, ShippingController.list);
router.get('/shipping-zones/:id', isAuthenticated, isAdmin, ShippingController.get);
router.put('/shipping-zones/:id', isAuthenticated, isAdmin, ShippingController.update);
router.delete('/shipping-zones/:id', isAuthenticated, isAdmin, ShippingController.delete);

router.post('/shipping-zones/cities', isAuthenticated, isAdmin, ShippingController.createCity);
router.delete('/shipping-zones/cities/:id', isAuthenticated, isAdmin, ShippingController.deleteCity);


// Categories
router.post('/categories', isAuthenticated, isAdmin, CategoryController.create);
router.get('/categories',  CategoryController.list);
router.put('/categories/:id', isAuthenticated, isAdmin, CategoryController.update);
router.delete('/categories/:id', isAuthenticated, isAdmin, CategoryController.delete);

export default router;
