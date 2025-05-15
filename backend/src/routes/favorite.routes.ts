// src/routes/favorite.routes.ts
import { Router } from 'express';
import { FavoriteController } from '../controllers/favorite.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

// Protegido por autenticação
router.use(isAuthenticated);

// Adicionar produto aos favoritos
router.post('/:productId', FavoriteController.add);

// Remover produto dos favoritos
router.delete('/:productId', FavoriteController.remove);

// Listar favoritos do usuário
router.get('/', FavoriteController.list);

router.get('/:productId/check', FavoriteController.check);

export default router;
