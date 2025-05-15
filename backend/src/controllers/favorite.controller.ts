// src/controllers/favorite.controller.ts
import { Request, Response } from 'express';
import { FavoriteService } from '../services/favorite.service';

export class FavoriteController {
  static async add(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const productId = Number(req.params.productId);

    try {
      await FavoriteService.add(userId, productId);
      res.status(201).json({ message: 'Produto adicionado aos favoritos' });
    } catch (err: any) {
      if (err.code === 'P2002') {
        res.status(400).json({ message: 'Produto já está nos favoritos' });
      } else {
        console.error('Erro ao adicionar favorito:', err);
        res.status(500).json({ message: 'Erro ao adicionar favorito' });
      }
    }
  }

  static async remove(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const productId = Number(req.params.productId);

    try {
      await FavoriteService.remove(userId, productId);
      res.json({ message: 'Produto removido dos favoritos' });
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
      res.status(500).json({ message: 'Erro ao remover favorito' });
    }
  }

  static async list(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;

    try {
      const products = await FavoriteService.list(userId);
      res.json(products);
    } catch (err) {
      console.error('Erro ao listar favoritos:', err);
      res.status(500).json({ message: 'Erro ao listar favoritos' });
    }
  }
  
  static async check(req: Request, res: Response): Promise<void> {
        const userId = req.user!.userId;
        const productId = Number(req.params.productId);
    
        try {
        const exists = await FavoriteService.check(userId, productId);
        res.json({ favorited: exists });
        } catch (err) {
            console.error('Erro ao verificar favorito:', err);
            res.status(500).json({ message: 'Erro ao verificar favorito' });

        }
    }
        
  


  
}
